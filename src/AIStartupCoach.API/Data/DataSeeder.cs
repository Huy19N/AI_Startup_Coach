using AIStartupCoach.API.Entities;
using Microsoft.AspNetCore.Identity;

namespace AIStartupCoach.API.Data;

public static class DataSeeder
{
    public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        string[] roleNames = { "Admin", "Mentor", "Student" };

        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var adminEmail = "admin@startupcoach.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "System Admin",
                AiQuota = 999999
            };

            var createPowerUser = await userManager.CreateAsync(adminUser, "Admin@123");
            if (createPowerUser.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
        else if (adminUser.AiQuota < 100)
        {
            // Auto-reset admin quota on startup
            adminUser.AiQuota = 999999;
            await userManager.UpdateAsync(adminUser);
        }

        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (!dbContext.PromptTemplates.Any(t => t.DocumentType == "Constitution"))
        {
            var oldTemplates = dbContext.PromptTemplates.ToList();
            if (oldTemplates.Any())
            {
                dbContext.PromptTemplates.RemoveRange(oldTemplates);
                await dbContext.SaveChangesAsync();
            }
            var templatesPath = Path.Combine(Directory.GetCurrentDirectory(), "Templates");
            var files = new Dictionary<string, string>
            {
                { "Constitution", "00-constitution.md" },
                { "CoachClarify", "01-coach-clarify.md" },
                { "CoachPlan", "02-coach-plan.md" },
                { "CoachExecute", "03-coach-execute.md" },
                { "CoachSafetyReview", "04-coach-safety-review.md" }
            };

            foreach (var file in files)
            {
                var filePath = Path.Combine(templatesPath, file.Value);
                string content = $"Mẫu mặc định cho {file.Key}";
                if (File.Exists(filePath))
                {
                    content = await File.ReadAllTextAsync(filePath);
                }

                dbContext.PromptTemplates.Add(new PromptTemplate
                {
                    DocumentType = file.Key,
                    SystemPrompt = content,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
            }

            await dbContext.SaveChangesAsync();
        }
    }
}
