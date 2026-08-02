using AIStartupCoach.API.Controllers;
using AIStartupCoach.API.DTOs.Templates;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Controllers;

public class AdminTemplateControllerTests
{
    private readonly Mock<ITemplateService> _templateServiceMock = new();

    [Fact]
    public async Task GetAll_ShouldReturnOkResult()
    {
        // Arrange
        var mockList = new List<PromptTemplateDto>
        {
            new PromptTemplateDto { Id = 1, DocumentType = "General" }
        };

        _templateServiceMock.Setup(s => s.GetAllTemplatesAsync()).ReturnsAsync(mockList);
        var controller = new AdminTemplateController(_templateServiceMock.Object);

        // Act
        var result = await controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var data = Assert.IsType<List<PromptTemplateDto>>(okResult.Value);
        Assert.Single(data);
    }

    [Fact]
    public async Task Create_ShouldReturnCreatedResult()
    {
        // Arrange
        var request = new CreatePromptTemplateRequest { DocumentType = "LeanCanvas", SystemPrompt = "content" };
        var dto = new PromptTemplateDto { Id = 5, DocumentType = "LeanCanvas" };

        _templateServiceMock.Setup(s => s.CreateTemplateAsync(request)).ReturnsAsync(dto);
        var controller = new AdminTemplateController(_templateServiceMock.Object);

        // Act
        var result = await controller.Create(request);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var data = Assert.IsType<PromptTemplateDto>(createdResult.Value);
        Assert.Equal(5, data.Id);
    }
}
