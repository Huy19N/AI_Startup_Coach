using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Repositories.Interfaces;

public interface IDocumentRepository
{
    Task<List<Document>> GetDocumentsBySessionIdAsync(int sessionId);
    Task<Document?> GetDocumentByIdAsync(int id);
    Task<Document> AddDocumentAsync(Document document);
    Task UpdateDocumentAsync(Document document);
    Task<bool> DeleteDocumentAsync(int id);
}
