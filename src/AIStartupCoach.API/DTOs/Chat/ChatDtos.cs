using System.ComponentModel.DataAnnotations;

namespace AIStartupCoach.API.DTOs.Chat;

public class CreateSessionRequest
{
    [MaxLength(200)]
    public string Title { get; set; } = "Cuộc trò chuyện mới";
}

public class SendMessageRequest
{
    [Required(ErrorMessage = "Tin nhắn là bắt buộc")]
    public string Message { get; set; } = string.Empty;

    [Required(ErrorMessage = "Provider là bắt buộc")]
    public string Provider { get; set; } = string.Empty;
}

public class ChatSessionResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int MessageCount { get; set; }
}

public class ChatMessageResponse
{
    public int Id { get; set; }
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class SendMessageResponse
{
    public ChatMessageResponse UserMessage { get; set; } = null!;
    public ChatMessageResponse AssistantMessage { get; set; } = null!;
}
