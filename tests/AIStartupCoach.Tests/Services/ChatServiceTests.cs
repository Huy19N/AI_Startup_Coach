using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services;
using AIStartupCoach.API.Services.Interfaces;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class ChatServiceTests
{
    private readonly Mock<IChatRepository> _mockChatRepo;
    private readonly Mock<IApiKeyService> _mockApiKeyService;
    private readonly Mock<ILlmService> _mockLlmService;
    private readonly ChatService _service;

    public ChatServiceTests()
    {
        _mockChatRepo = new Mock<IChatRepository>();
        _mockApiKeyService = new Mock<IApiKeyService>();
        _mockLlmService = new Mock<ILlmService>();
        _service = new ChatService(_mockChatRepo.Object, _mockApiKeyService.Object, _mockLlmService.Object);
    }

    [Fact]
    public async Task SendMessageAsync_WithValidKey_ShouldCallLlmAndSaveMessages()
    {
        // Arrange
        var userId = "user1";
        var sessionId = 1;
        var request = new SendMessageRequest { Message = "Hello", Provider = "openai" };
        var session = new ChatSession { Id = sessionId, UserId = userId, Title = "Cuộc trò chuyện mới" };
        var apiKey = "sk-12345";
        var aiResponse = "Hi there, I am your coach.";

        _mockChatRepo.Setup(r => r.GetSessionByIdAsync(sessionId)).ReturnsAsync(session);
        _mockApiKeyService.Setup(s => s.GetDecryptedKeyAsync(userId, request.Provider)).ReturnsAsync(apiKey);
        _mockChatRepo.Setup(r => r.GetMessagesBySessionIdAsync(sessionId)).ReturnsAsync(new List<ChatMessage>());
        
        _mockLlmService.Setup(s => s.SendMessageAsync(request.Provider, apiKey, It.IsAny<string>(), It.IsAny<List<LlmMessage>>()))
            .ReturnsAsync(aiResponse);

        _mockChatRepo.Setup(r => r.AddMessageAsync(It.IsAny<ChatMessage>()))
            .ReturnsAsync((ChatMessage msg) => { msg.Id = new Random().Next(1, 100); return msg; });

        // Act
        var result = await _service.SendMessageAsync(userId, sessionId, request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("user", result.UserMessage.Role);
        Assert.Equal("Hello", result.UserMessage.Content);
        Assert.Equal("assistant", result.AssistantMessage.Role);
        Assert.Equal(aiResponse, result.AssistantMessage.Content);

        // Verify title was updated since it was the first message
        _mockChatRepo.Verify(r => r.UpdateSessionAsync(It.Is<ChatSession>(s => s.Title == "Hello")), Times.Once);
        // Verify 2 messages were added (user + assistant)
        _mockChatRepo.Verify(r => r.AddMessageAsync(It.IsAny<ChatMessage>()), Times.Exactly(2));
    }

    [Fact]
    public async Task SendMessageAsync_WithoutKey_ShouldThrowException()
    {
        // Arrange
        var userId = "user1";
        var sessionId = 1;
        var request = new SendMessageRequest { Message = "Hello", Provider = "openai" };
        var session = new ChatSession { Id = sessionId, UserId = userId };

        _mockChatRepo.Setup(r => r.GetSessionByIdAsync(sessionId)).ReturnsAsync(session);
        _mockApiKeyService.Setup(s => s.GetDecryptedKeyAsync(userId, request.Provider)).ReturnsAsync((string?)null);

        // Act & Assert
        var ex = await Assert.ThrowsAsync<InvalidOperationException>(() => 
            _service.SendMessageAsync(userId, sessionId, request));
            
        Assert.Contains("Không tìm thấy API key", ex.Message);
        _mockLlmService.Verify(s => s.SendMessageAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<List<LlmMessage>>()), Times.Never);
    }
}
