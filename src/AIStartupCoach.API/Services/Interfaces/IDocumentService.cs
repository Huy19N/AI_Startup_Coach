using AIStartupCoach.API.DTOs.Documents;

namespace AIStartupCoach.API.Services.Interfaces;

public interface IDocumentService
{
    Task<DocumentVersionResponse> CreateVersionAsync(string userId, int documentId, CreateVersionRequest request);
    Task<List<DocumentVersionResponse>> GetVersionsAsync(string userId, int documentId);
}
