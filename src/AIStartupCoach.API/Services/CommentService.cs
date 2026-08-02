using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Models.Responses;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services;

public class CommentService : ICommentService
{
    private readonly ICommentRepository _commentRepository;
    private readonly IDocumentRepository _documentRepository;
    private readonly ILogger<CommentService> _logger;

    public CommentService(ICommentRepository commentRepository, IDocumentRepository documentRepository, ILogger<CommentService> logger)
    {
        _commentRepository = commentRepository;
        _documentRepository = documentRepository;
        _logger = logger;
    }

    public async Task<CommentResponse> CreateCommentAsync(int documentId, string userId, CreateCommentRequest request)
    {
        var document = await _documentRepository.GetDocumentByIdAsync(documentId);
        if (document == null)
        {
            throw new Exception("Document not found");
        }

        var comment = new DocumentComment
        {
            DocumentId = documentId,
            UserId = userId,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow
        };

        var createdComment = await _commentRepository.AddCommentAsync(comment);

        return new CommentResponse
        {
            Id = createdComment.Id,
            DocumentId = createdComment.DocumentId,
            UserId = createdComment.UserId,
            Content = createdComment.Content,
            CreatedAt = createdComment.CreatedAt
        };
    }

    public async Task<List<CommentResponse>> GetCommentsByDocumentIdAsync(int documentId)
    {
        var comments = await _commentRepository.GetCommentsByDocumentIdAsync(documentId);
        return comments.Select(c => new CommentResponse
        {
            Id = c.Id,
            DocumentId = c.DocumentId,
            UserId = c.UserId,
            Content = c.Content,
            CreatedAt = c.CreatedAt
        }).ToList();
    }
}
