using System.Security.Claims;
using AIStartupCoach.API.Controllers;
using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.DTOs.Documents;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Controllers;

public class DocumentsControllerTests
{
    private readonly Mock<IDocumentService> _documentServiceMock = new();

    private DocumentsController CreateControllerWithUser(string userId)
    {
        var controller = new DocumentsController(_documentServiceMock.Object);
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId)
        }, "mock"));

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };

        return controller;
    }

    [Fact]
    public async Task CreateVersion_ShouldReturnOkWithVersion_WhenSuccessful()
    {
        // Arrange
        var userId = "user-123";
        var docId = 5;
        var request = new CreateVersionRequest { Content = "Updated text" };
        var response = new DocumentVersionResponse { Id = 1, DocumentId = docId, Content = "Updated text" };

        _documentServiceMock.Setup(s => s.CreateVersionAsync(userId, docId, request))
            .ReturnsAsync(response);

        var controller = CreateControllerWithUser(userId);

        // Act
        var result = await controller.CreateVersion(docId, request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var data = Assert.IsType<DocumentVersionResponse>(okResult.Value);
        Assert.Equal("Updated text", data.Content);
    }

    [Fact]
    public async Task GetVersions_ShouldReturnOkWithList_WhenSuccessful()
    {
        // Arrange
        var userId = "user-123";
        var docId = 5;
        var responseList = new List<DocumentVersionResponse>
        {
            new DocumentVersionResponse { Id = 1, DocumentId = docId, Content = "V1" }
        };

        _documentServiceMock.Setup(s => s.GetVersionsAsync(userId, docId))
            .ReturnsAsync(responseList);

        var controller = CreateControllerWithUser(userId);

        // Act
        var result = await controller.GetVersions(docId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var data = Assert.IsType<List<DocumentVersionResponse>>(okResult.Value);
        Assert.Single(data);
    }
    [Fact]
    public async Task ProvideFeedback_ShouldReturnOkWithResponse_WhenSuccessful()
    {
        // Arrange
        var userId = "user-123";
        var docId = 5;
        var request = new DocumentFeedbackRequest { IsLiked = true, FeedbackText = "Good" };
        var response = new DocumentResponse { Id = docId, Type = "LeanCanvas", Content = "Content" };

        _documentServiceMock.Setup(s => s.ProvideFeedbackAsync(docId, userId, request))
            .ReturnsAsync(response);

        var controller = CreateControllerWithUser(userId);

        // Act
        var result = await controller.ProvideFeedback(docId, request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var data = Assert.IsType<DocumentResponse>(okResult.Value);
        Assert.Equal(docId, data.Id);
    }
}
