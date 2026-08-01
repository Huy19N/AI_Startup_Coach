using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.Entities;

public class ApiKey
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Provider { get; set; } = string.Empty; // openai, gemini, claude, groq

    [Required]
    public string EncryptedKey { get; set; } = string.Empty;

    [MaxLength(100)]
    public string DisplayName { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public ApplicationUser User { get; set; } = null!;
}
