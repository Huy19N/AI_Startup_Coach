using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class PromptTemplate
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string DocumentType { get; set; } = string.Empty; // "LeanCanvas", "SWOT", etc.

    [Required]
    public string SystemPrompt { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
