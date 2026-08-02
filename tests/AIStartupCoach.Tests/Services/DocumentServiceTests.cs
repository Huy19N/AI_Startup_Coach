using AIStartupCoach.API.DTOs.Documents;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class DocumentServiceTests
{
    private readonly Mock<IDocumentRepository> _documentRepoMock = new();
    private readonly Mock<IChatRepository> _chatRepoMock = new();

    [Fact]
    public async Task CreateVersionAsync_ShouldCreateVersionAndUpdateDocument_WhenUserIsAuthorized()
    {
        // Arrange
        var userId = "user-1";
        var docId = 10;
        var sessionId = 100;

        var document = new Document
        {
            Id = docId,
            ChatSessionId = sessionId,
            Type = "LeanCanvas",
            Content = "Old Content"
        };
        var session = new ChatSession
        {
            Id = sessionId,
            UserId = userId
        };

        _documentRepoMock.Setup(r => r.GetDocumentByIdAsync(docId)).ReturnsAsync(document);
        _chatRepoMock.Setup(r => r.GetSessionByIdAsync(sessionId)).ReturnsAsync(session);
        _documentRepoMock.Setup(r => r.AddVersionAsync(It.IsAny<DocumentVersion>()))
            .ReturnsAsync((DocumentVersion v) => { v.Id = 1; return v; });

        var service = new DocumentService(_documentRepoMock.Object, _chatRepoMock.Object);

        // Act
        var result = await service.CreateVersionAsync(userId, docId, new CreateVersionRequest { Content = "New Content" });

        // Assert
        Assert.NotNull(result);
        Assert.Equal("New Content", result.Content);
        Assert.Equal("New Content", document.Content);
        _documentRepoMock.Verify(r => r.UpdateDocumentAsync(document), Times.Once);
        _documentRepoMock.Verify(r => r.AddVersionAsync(It.IsAny<DocumentVersion>()), Times.Once);
    }

    [Fact]
    public async Task CreateVersionAsync_ShouldThrowUnauthorized_WhenUserIsNotOwner()
    {
        // Arrange
        var docId = 10;
        var sessionId = 100;

        var document = new Document { Id = docId, ChatSessionId = sessionId };
        var session = new ChatSession { Id = sessionId, UserId = "owner-user" };

        _documentRepoMock.Setup(r => r.GetDocumentByIdAsync(docId)).ReturnsAsync(document);
        _chatRepoMock.Setup(r => r.GetSessionByIdAsync(sessionId)).ReturnsAsync(session);

        var service = new DocumentService(_documentRepoMock.Object, _chatRepoMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
            service.CreateVersionAsync("other-user", docId, new CreateVersionRequest { Content = "New Content" }));
    }
}
