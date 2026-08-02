using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class DocumentVersion
{
    public int Id { get; set; }

    public int DocumentId { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Document Document { get; set; } = null!;
}
