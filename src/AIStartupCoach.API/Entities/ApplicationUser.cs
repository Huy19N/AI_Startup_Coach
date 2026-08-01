using Microsoft.AspNetCore.Identity;

namespace AIStartupCoach.API.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }

    // Navigation properties
    public ICollection<ApiKey> ApiKeys { get; set; } = new List<ApiKey>();
    public ICollection<ChatSession> ChatSessions { get; set; } = new List<ChatSession>();
}
