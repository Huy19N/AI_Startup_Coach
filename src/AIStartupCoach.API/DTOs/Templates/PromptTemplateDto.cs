namespace AIStartupCoach.API.DTOs.Templates;

public class PromptTemplateDto
{
    public int Id { get; set; }
    public string DocumentType { get; set; } = string.Empty;
    public string SystemPrompt { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreatePromptTemplateRequest
{
    public string DocumentType { get; set; } = string.Empty;
    public string SystemPrompt { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}

public class UpdatePromptTemplateRequest
{
    public string DocumentType { get; set; } = string.Empty;
    public string SystemPrompt { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}
