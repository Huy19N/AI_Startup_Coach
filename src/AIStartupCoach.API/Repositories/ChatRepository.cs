using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIStartupCoach.API.Repositories;

public class ChatRepository : IChatRepository
{
    private readonly AppDbContext _context;

    public ChatRepository(AppDbContext context)
    {
        _context = context;
    }

    // Sessions
    public async Task<List<ChatSession>> GetSessionsByUserIdAsync(string userId)
    {
        return await _context.ChatSessions
            .Where(s => s.UserId == userId)
            .Include(s => s.Messages)
            .Include(s => s.Documents)
            .OrderByDescending(s => s.UpdatedAt ?? s.CreatedAt)
            .ToListAsync();
    }

    public async Task<ChatSession?> GetSessionByIdAsync(int id)
    {
        return await _context.ChatSessions
            .Include(s => s.Messages.OrderBy(m => m.CreatedAt))
            .Include(s => s.Documents)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<ChatSession> CreateSessionAsync(ChatSession session)
    {
        _context.ChatSessions.Add(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task UpdateSessionAsync(ChatSession session)
    {
        _context.ChatSessions.Update(session);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteSessionAsync(int id)
    {
        var session = await _context.ChatSessions.FindAsync(id);
        if (session == null) return false;

        _context.ChatSessions.Remove(session);
        await _context.SaveChangesAsync();
        return true;
    }

    // Messages
    public async Task<List<ChatMessage>> GetMessagesBySessionIdAsync(int sessionId)
    {
        return await _context.ChatMessages
            .Where(m => m.ChatSessionId == sessionId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<ChatMessage> AddMessageAsync(ChatMessage message)
    {
        _context.ChatMessages.Add(message);
        await _context.SaveChangesAsync();
        return message;
    }
}
