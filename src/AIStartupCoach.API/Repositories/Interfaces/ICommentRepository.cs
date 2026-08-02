using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Repositories.Interfaces;

public interface ICommentRepository
{
    Task<List<DocumentComment>> GetCommentsByDocumentIdAsync(int documentId);
    Task<DocumentComment> AddCommentAsync(DocumentComment comment);
}
