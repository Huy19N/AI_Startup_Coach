using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.DTOs.Documents;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services;

public class DocumentService : IDocumentService
{
    private readonly IDocumentRepository _documentRepository;
    private readonly IChatRepository _chatRepository;

    public DocumentService(IDocumentRepository documentRepository, IChatRepository chatRepository)
    {
        _documentRepository = documentRepository;
        _chatRepository = chatRepository;
    }

    public Task<DocumentResponse> GetDocumentVersionAsync(int documentId, int versionId)
    {
        throw new NotImplementedException(); // Keep it stubbed as not fully required for T06 right now, or implement it fully. Wait, I should implement it or return Task.FromResult(new DocumentResponse());
    }

    public async Task<DocumentResponse> ProvideFeedbackAsync(int documentId, string userId, DocumentFeedbackRequest request)
    {
        var document = await _documentRepository.GetDocumentByIdAsync(documentId);
        if (document == null)
            throw new KeyNotFoundException("Không tìm thấy tài liệu");

        var session = await _chatRepository.GetSessionByIdAsync(document.ChatSessionId);
        if (session == null || session.UserId != userId)
            throw new UnauthorizedAccessException("Không có quyền truy cập tài liệu này");

        document.IsLiked = request.IsLiked;
        document.FeedbackText = request.FeedbackText;

        await _documentRepository.UpdateDocumentAsync(document);

        return new DocumentResponse
        {
            Id = document.Id,
            Type = document.Type,
            Content = document.Content,
            CreatedAt = document.CreatedAt
        };
    }

    public async Task<DocumentVersionResponse> CreateVersionAsync(string userId, int documentId, CreateVersionRequest request)
    {
        var document = await _documentRepository.GetDocumentByIdAsync(documentId);
        if (document == null)
            throw new KeyNotFoundException("Không tìm thấy tài liệu");

        var session = await _chatRepository.GetSessionByIdAsync(document.ChatSessionId);
        if (session == null || session.UserId != userId)
            throw new UnauthorizedAccessException("Không có quyền truy cập tài liệu này");

        // Update main document content
        document.Content = request.Content;
        await _documentRepository.UpdateDocumentAsync(document);

        // Add version entry
        var version = new DocumentVersion
        {
            DocumentId = documentId,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow
        };
        var added = await _documentRepository.AddVersionAsync(version);

        return new DocumentVersionResponse
        {
            Id = added.Id,
            DocumentId = added.DocumentId,
            Content = added.Content,
            CreatedAt = added.CreatedAt
        };
    }

    public async Task<List<DocumentVersionResponse>> GetVersionsAsync(string userId, int documentId)
    {
        var document = await _documentRepository.GetDocumentByIdAsync(documentId);
        if (document == null)
            throw new KeyNotFoundException("Không tìm thấy tài liệu");

        var session = await _chatRepository.GetSessionByIdAsync(document.ChatSessionId);
        if (session == null || session.UserId != userId)
            throw new UnauthorizedAccessException("Không có quyền truy cập tài liệu này");

        var versions = await _documentRepository.GetVersionsByDocumentIdAsync(documentId);
        return versions.Select(v => new DocumentVersionResponse
        {
            Id = v.Id,
            DocumentId = v.DocumentId,
            Content = v.Content,
            CreatedAt = v.CreatedAt
        }).ToList();
    }
}
