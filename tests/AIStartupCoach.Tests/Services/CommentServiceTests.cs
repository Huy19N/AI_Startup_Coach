using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class CommentServiceTests
{
    private readonly Mock<ICommentRepository> _mockCommentRepo;
    private readonly Mock<IDocumentRepository> _mockDocRepo;
    private readonly Mock<ILogger<CommentService>> _mockLogger;
    private readonly CommentService _service;

    public CommentServiceTests()
    {
        _mockCommentRepo = new Mock<ICommentRepository>();
        _mockDocRepo = new Mock<IDocumentRepository>();
        _mockLogger = new Mock<ILogger<CommentService>>();
        _service = new CommentService(_mockCommentRepo.Object, _mockDocRepo.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task CreateCommentAsync_ShouldReturnComment_WhenDocumentExists()
    {
        // Arrange
        var documentId = 1;
        var userId = "user-123";
        var request = new CreateCommentRequest { Content = "Test comment" };

        var document = new Document { Id = documentId };
        _mockDocRepo.Setup(r => r.GetDocumentByIdAsync(documentId)).ReturnsAsync(document);

        _mockCommentRepo.Setup(r => r.AddCommentAsync(It.IsAny<DocumentComment>()))
            .ReturnsAsync((DocumentComment c) =>
            {
                c.Id = 1;
                return c;
            });

        // Act
        var result = await _service.CreateCommentAsync(documentId, userId, request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal(documentId, result.DocumentId);
        Assert.Equal(userId, result.UserId);
        Assert.Equal(request.Content, result.Content);
        
        _mockCommentRepo.Verify(r => r.AddCommentAsync(It.IsAny<DocumentComment>()), Times.Once);
    }

    [Fact]
    public async Task CreateCommentAsync_ShouldThrowException_WhenDocumentDoesNotExist()
    {
        // Arrange
        var documentId = 1;
        var userId = "user-123";
        var request = new CreateCommentRequest { Content = "Test comment" };

        _mockDocRepo.Setup(r => r.GetDocumentByIdAsync(documentId)).ReturnsAsync((Document)null);

        // Act & Assert
        await Assert.ThrowsAsync<Exception>(() => _service.CreateCommentAsync(documentId, userId, request));
    }

    [Fact]
    public async Task GetCommentsByDocumentIdAsync_ShouldReturnComments()
    {
        // Arrange
        var documentId = 1;
        var comments = new List<DocumentComment>
        {
            new DocumentComment { Id = 1, DocumentId = documentId, UserId = "u1", Content = "C1", CreatedAt = DateTime.UtcNow },
            new DocumentComment { Id = 2, DocumentId = documentId, UserId = "u2", Content = "C2", CreatedAt = DateTime.UtcNow }
        };

        _mockCommentRepo.Setup(r => r.GetCommentsByDocumentIdAsync(documentId)).ReturnsAsync(comments);

        // Act
        var result = await _service.GetCommentsByDocumentIdAsync(documentId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        Assert.Equal(comments[0].Id, result[0].Id);
        Assert.Equal(comments[1].Id, result[1].Id);
    }
}
