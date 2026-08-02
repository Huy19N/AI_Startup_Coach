using Microsoft.AspNetCore.Identity;

namespace AIStartupCoach.API.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }

    // AI Quota (defaults to 50 for new users)
    public int AiQuota { get; set; } = 50;

    // Navigation properties
    public ICollection<ApiKey> ApiKeys { get; set; } = new List<ApiKey>();
    public ICollection<ChatSession> ChatSessions { get; set; } = new List<ChatSession>();
}
