using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.DTOs.Documents;
using AIStartupCoach.API.Models.Requests;

namespace AIStartupCoach.API.Services.Interfaces;

public interface IDocumentService
{
    Task<DocumentResponse> GetDocumentVersionAsync(int documentId, int versionId);
    Task<DocumentResponse> ProvideFeedbackAsync(int documentId, string userId, DocumentFeedbackRequest request);
    Task<DocumentVersionResponse> CreateVersionAsync(string userId, int documentId, CreateVersionRequest request);
    Task<List<DocumentVersionResponse>> GetVersionsAsync(string userId, int documentId);
}
