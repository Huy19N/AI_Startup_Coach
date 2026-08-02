using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIStartupCoach.API.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly AppDbContext _context;

    public CommentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DocumentComment> AddCommentAsync(DocumentComment comment)
    {
        _context.DocumentComments.Add(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    public async Task<List<DocumentComment>> GetCommentsByDocumentIdAsync(int documentId)
    {
        return await _context.DocumentComments
            .Where(c => c.DocumentId == documentId)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();
    }
}
