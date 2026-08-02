using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class ChatSession
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Title { get; set; } = "Cuộc trò chuyện mới";

    public string? IdeaSummary { get; set; }

    [MaxLength(50)]
    public string Stage { get; set; } = "clarifying";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public ApplicationUser User { get; set; } = null!;
    public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    public ICollection<Document> Documents { get; set; } = new List<Document>();
}
