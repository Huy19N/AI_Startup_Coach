using AIStartupCoach.API.DTOs.Chat;

namespace AIStartupCoach.API.Services.Interfaces;

public interface IChatService
{
    Task<List<ChatSessionResponse>> GetUserSessionsAsync(string userId);
    Task<ChatSessionResponse> CreateSessionAsync(string userId, CreateSessionRequest request);
    Task<List<ChatMessageResponse>> GetSessionMessagesAsync(string userId, int sessionId);
    Task<SendMessageResponse> SendMessageAsync(string userId, int sessionId, SendMessageRequest request);
    Task<bool> DeleteSessionAsync(string userId, int sessionId);
}
