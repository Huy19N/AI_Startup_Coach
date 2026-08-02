using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class DocumentComment
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Document Document { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;
}
