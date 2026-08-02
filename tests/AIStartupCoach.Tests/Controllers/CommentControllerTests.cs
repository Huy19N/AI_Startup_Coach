using System.Security.Claims;
using AIStartupCoach.API.Controllers;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Models.Responses;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Controllers;

public class CommentControllerTests
{
    private readonly Mock<ICommentService> _mockCommentService;
    private readonly CommentController _controller;

    public CommentControllerTests()
    {
        _mockCommentService = new Mock<ICommentService>();
        _controller = new CommentController(_mockCommentService.Object);
        
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, "user-123")
        }, "mock"));

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };
    }

    [Fact]
    public async Task GetComments_ShouldReturnOk()
    {
        // Arrange
        var documentId = 1;
        var comments = new List<CommentResponse>
        {
            new CommentResponse { Id = 1, Content = "Test" }
        };
        _mockCommentService.Setup(s => s.GetCommentsByDocumentIdAsync(documentId)).ReturnsAsync(comments);

        // Act
        var result = await _controller.GetComments(documentId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnComments = Assert.IsType<List<CommentResponse>>(okResult.Value);
        Assert.Single(returnComments);
    }

    [Fact]
    public async Task CreateComment_ShouldReturnOk()
    {
        // Arrange
        var documentId = 1;
        var request = new CreateCommentRequest { Content = "Test" };
        var response = new CommentResponse { Id = 1, Content = "Test", UserId = "user-123" };
        
        _mockCommentService.Setup(s => s.CreateCommentAsync(documentId, "user-123", request)).ReturnsAsync(response);

        // Act
        var result = await _controller.CreateComment(documentId, request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnComment = Assert.IsType<CommentResponse>(okResult.Value);
        Assert.Equal(response.Id, returnComment.Id);
    }
}
