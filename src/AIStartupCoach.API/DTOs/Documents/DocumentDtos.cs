using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.DTOs.Documents;

public class CreateVersionRequest
{
    [Required]
    public string Content { get; set; } = string.Empty;
}

public class DocumentVersionResponse
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
