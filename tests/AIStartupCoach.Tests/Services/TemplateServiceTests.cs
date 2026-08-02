using AIStartupCoach.API.DTOs.Templates;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class TemplateServiceTests
{
    private readonly Mock<ITemplateRepository> _templateRepoMock = new();

    [Fact]
    public async Task GetAllTemplatesAsync_ShouldReturnList()
    {
        // Arrange
        var templates = new List<PromptTemplate>
        {
            new PromptTemplate { Id = 1, DocumentType = "General", SystemPrompt = "Prompt 1" }
        };

        _templateRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(templates);
        var service = new TemplateService(_templateRepoMock.Object);

        // Act
        var result = await service.GetAllTemplatesAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal("General", result[0].DocumentType);
    }

    [Fact]
    public async Task CreateTemplateAsync_ShouldReturnDto()
    {
        // Arrange
        var request = new CreatePromptTemplateRequest { DocumentType = "SWOT", SystemPrompt = "SWOT prompt" };
        var createdEntity = new PromptTemplate { Id = 2, DocumentType = "SWOT", SystemPrompt = "SWOT prompt" };

        _templateRepoMock.Setup(r => r.AddAsync(It.IsAny<PromptTemplate>())).ReturnsAsync(createdEntity);
        var service = new TemplateService(_templateRepoMock.Object);

        // Act
        var result = await service.CreateTemplateAsync(request);

        // Assert
        Assert.Equal(2, result.Id);
        Assert.Equal("SWOT", result.DocumentType);
    }
}
