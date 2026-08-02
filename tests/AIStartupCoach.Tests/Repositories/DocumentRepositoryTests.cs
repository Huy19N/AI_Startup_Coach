using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace AIStartupCoach.Tests.Repositories;

public class DocumentRepositoryTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task AddVersionAsync_ShouldAddVersionToDatabase()
    {
        // Arrange
        var context = GetDbContext();
        var repository = new DocumentRepository(context);
        var document = new Document { Id = 1, ChatSessionId = 1, Type = "LeanCanvas", Content = "Initial Content" };
        context.Documents.Add(document);
        await context.SaveChangesAsync();

        var version = new DocumentVersion { DocumentId = 1, Content = "Version 2 Content" };

        // Act
        var result = await repository.AddVersionAsync(version);

        // Assert
        Assert.NotNull(result);
        Assert.True(result.Id > 0);
        Assert.Equal("Version 2 Content", result.Content);
        
        var versionsInDb = await context.DocumentVersions.ToListAsync();
        Assert.Single(versionsInDb);
    }

    [Fact]
    public async Task GetVersionsByDocumentIdAsync_ShouldReturnOrderedVersions()
    {
        // Arrange
        var context = GetDbContext();
        var repository = new DocumentRepository(context);
        var document = new Document { Id = 1, ChatSessionId = 1, Type = "LeanCanvas", Content = "Initial Content" };
        context.Documents.Add(document);
        
        var v1 = new DocumentVersion { DocumentId = 1, Content = "V1", CreatedAt = DateTime.UtcNow.AddMinutes(-10) };
        var v2 = new DocumentVersion { DocumentId = 1, Content = "V2", CreatedAt = DateTime.UtcNow };
        context.DocumentVersions.AddRange(v1, v2);
        await context.SaveChangesAsync();

        // Act
        var versions = await repository.GetVersionsByDocumentIdAsync(1);

        // Assert
        Assert.Equal(2, versions.Count);
        Assert.Equal("V2", versions[0].Content); // OrderByDescending CreatedAt
    }
}
