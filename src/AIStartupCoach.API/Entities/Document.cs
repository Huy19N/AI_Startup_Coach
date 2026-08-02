using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class Document
{
    public int Id { get; set; }

    public int ChatSessionId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty; // "LeanCanvas", "SWOT", etc.

    [Required]
    public string Content { get; set; } = string.Empty; // Markdown content

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Feedback
    public bool? IsLiked { get; set; }
    public string? FeedbackText { get; set; }

    // Navigation
    public ChatSession ChatSession { get; set; } = null!;
    public ICollection<DocumentVersion> Versions { get; set; } = new List<DocumentVersion>();
    public ICollection<DocumentComment> Comments { get; set; } = new List<DocumentComment>();
}
