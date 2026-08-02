using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIStartupCoach.API.Repositories;

public class DocumentRepository : IDocumentRepository
{
    private readonly AppDbContext _context;

    public DocumentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Document>> GetDocumentsBySessionIdAsync(int sessionId)
    {
        return await _context.Documents
            .Where(d => d.ChatSessionId == sessionId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    public async Task<Document?> GetDocumentByIdAsync(int id)
    {
        return await _context.Documents.FindAsync(id);
    }

    public async Task<Document> AddDocumentAsync(Document document)
    {
        _context.Documents.Add(document);
        await _context.SaveChangesAsync();
        return document;
    }

    public async Task UpdateDocumentAsync(Document document)
    {
        _context.Documents.Update(document);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteDocumentAsync(int id)
    {
        var doc = await _context.Documents.FindAsync(id);
        if (doc == null) return false;

        _context.Documents.Remove(doc);
        await _context.SaveChangesAsync();
        return true;
    }
}
