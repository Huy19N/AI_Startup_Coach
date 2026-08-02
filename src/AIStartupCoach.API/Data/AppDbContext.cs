using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ApiKey> ApiKeys { get; set; } = null!;
    public DbSet<ChatSession> ChatSessions { get; set; } = null!;
    public DbSet<ChatMessage> ChatMessages { get; set; } = null!;
    public DbSet<Document> Documents { get; set; } = null!;
    public DbSet<DocumentVersion> DocumentVersions { get; set; } = null!;
    public DbSet<DocumentComment> DocumentComments { get; set; } = null!;
    public DbSet<PromptTemplate> PromptTemplates { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ApiKey configuration
        builder.Entity<ApiKey>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.Provider }).IsUnique();
            entity.HasOne(e => e.User)
                  .WithMany(u => u.ApiKeys)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ChatSession configuration
        builder.Entity<ChatSession>(entity =>
        {
            entity.HasIndex(e => e.UserId);
            entity.HasOne(e => e.User)
                  .WithMany(u => u.ChatSessions)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ChatMessage configuration
        builder.Entity<ChatMessage>(entity =>
        {
            entity.HasIndex(e => e.ChatSessionId);
            entity.HasOne(e => e.ChatSession)
                  .WithMany(s => s.Messages)
                  .HasForeignKey(e => e.ChatSessionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Document configuration
        builder.Entity<Document>(entity =>
        {
            entity.HasIndex(e => e.ChatSessionId);
            entity.HasOne(e => e.ChatSession)
                  .WithMany(s => s.Documents)
                  .HasForeignKey(e => e.ChatSessionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // DocumentVersion configuration
        builder.Entity<DocumentVersion>(entity =>
        {
            entity.HasIndex(e => e.DocumentId);
            entity.HasOne(e => e.Document)
                  .WithMany(d => d.Versions)
                  .HasForeignKey(e => e.DocumentId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // DocumentComment configuration
        builder.Entity<DocumentComment>(entity =>
        {
            entity.HasIndex(e => e.DocumentId);
            entity.HasOne(e => e.Document)
                  .WithMany(d => d.Comments)
                  .HasForeignKey(e => e.DocumentId)
                  .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(e => e.User)
                  .WithMany() // Assuming no reverse navigation from ApplicationUser to Comments to keep it simple, or we can add it later
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
