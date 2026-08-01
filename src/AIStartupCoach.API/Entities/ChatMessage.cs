using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class ChatMessage
{
    public int Id { get; set; }

    public int ChatSessionId { get; set; }

    [Required]
    [MaxLength(10)]
    public string Role { get; set; } = string.Empty; // "user" or "assistant"

    [Required]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ChatSession ChatSession { get; set; } = null!;
}
