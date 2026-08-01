using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Repositories.Interfaces;

public interface IChatRepository
{
    // Sessions
    Task<List<ChatSession>> GetSessionsByUserIdAsync(string userId);
    Task<ChatSession?> GetSessionByIdAsync(int id);
    Task<ChatSession> CreateSessionAsync(ChatSession session);
    Task UpdateSessionAsync(ChatSession session);
    Task<bool> DeleteSessionAsync(int id);

    // Messages
    Task<List<ChatMessage>> GetMessagesBySessionIdAsync(int sessionId);
    Task<ChatMessage> AddMessageAsync(ChatMessage message);
}
