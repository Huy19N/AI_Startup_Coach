using AIStartupCoach.API.DTOs.ApiKeys;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Helpers;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class ApiKeyServiceTests
{
    private readonly Mock<IApiKeyRepository> _mockRepo;
    private readonly Mock<IEncryptionHelper> _mockEncryption;
    private readonly ApiKeyService _service;

    public ApiKeyServiceTests()
    {
        _mockRepo = new Mock<IApiKeyRepository>();
        _mockEncryption = new Mock<IEncryptionHelper>();
        _service = new ApiKeyService(_mockRepo.Object, _mockEncryption.Object);
    }

    [Fact]
    public async Task CreateApiKeyAsync_ShouldEncryptAndSaveKey()
    {
        // Arrange
        var request = new CreateApiKeyRequest { Provider = "openai", ApiKey = "sk-12345", DisplayName = "My Key" };
        var userId = "user1";
        
        _mockRepo.Setup(r => r.GetByUserAndProviderAsync(userId, request.Provider))
            .ReturnsAsync((ApiKey?)null);

        _mockEncryption.Setup(e => e.Encrypt(request.ApiKey)).Returns("encrypted-key");
        
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<ApiKey>()))
            .ReturnsAsync((ApiKey key) => { key.Id = 1; return key; });

        // Act
        var result = await _service.CreateApiKeyAsync(userId, request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("openai", result.Provider);
        Assert.Equal("My Key", result.DisplayName);
        _mockEncryption.Verify(e => e.Encrypt(request.ApiKey), Times.Once);
        _mockRepo.Verify(r => r.CreateAsync(It.Is<ApiKey>(k => k.EncryptedKey == "encrypted-key")), Times.Once);
    }

    [Fact]
    public async Task GetDecryptedKeyAsync_ShouldDecryptKey()
    {
        // Arrange
        var userId = "user1";
        var provider = "openai";
        var apiKey = new ApiKey { EncryptedKey = "encrypted-key", IsActive = true };

        _mockRepo.Setup(r => r.GetByUserAndProviderAsync(userId, provider)).ReturnsAsync(apiKey);
        _mockEncryption.Setup(e => e.Decrypt("encrypted-key")).Returns("sk-12345");

        // Act
        var result = await _service.GetDecryptedKeyAsync(userId, provider);

        // Assert
        Assert.Equal("sk-12345", result);
        _mockEncryption.Verify(e => e.Decrypt("encrypted-key"), Times.Once);
    }
}
