using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Models.Responses;

namespace AIStartupCoach.API.Services.Interfaces;

public interface ICommentService
{
    Task<List<CommentResponse>> GetCommentsByDocumentIdAsync(int documentId);
    Task<CommentResponse> CreateCommentAsync(int documentId, string userId, CreateCommentRequest request);
}
