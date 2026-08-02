namespace AIStartupCoach.API.Models.Requests;

public class DocumentFeedbackRequest
{
    public bool? IsLiked { get; set; }
    public string? FeedbackText { get; set; }
}
