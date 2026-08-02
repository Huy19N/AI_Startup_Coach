namespace AIStartupCoach.API.Models.Responses;

public class CommentResponse
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
