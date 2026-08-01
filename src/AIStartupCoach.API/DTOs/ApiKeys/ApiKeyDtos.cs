using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.DTOs.ApiKeys;

public class CreateApiKeyRequest
{
    [Required(ErrorMessage = "Provider là bắt buộc")]
    [RegularExpression("^(openai|gemini|claude|groq)$", ErrorMessage = "Provider phải là openai, gemini, claude, hoặc groq")]
    public string Provider { get; set; } = string.Empty;

    [Required(ErrorMessage = "API Key là bắt buộc")]
    public string ApiKey { get; set; } = string.Empty;

    [MaxLength(100)]
    public string DisplayName { get; set; } = string.Empty;
}

public class ApiKeyResponse
{
    public int Id { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string MaskedKey { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
