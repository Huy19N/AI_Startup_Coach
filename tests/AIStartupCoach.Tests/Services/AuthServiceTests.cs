using AIStartupCoach.API.DTOs.Auth;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Services;

public class AuthServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
    private readonly Mock<IConfiguration> _mockConfig;
    private readonly AuthService _service;

    public AuthServiceTests()
    {
        var store = new Mock<IUserStore<ApplicationUser>>();
        _mockUserManager = new Mock<UserManager<ApplicationUser>>(store.Object, null!, null!, null!, null!, null!, null!, null!, null!);
        
        _mockConfig = new Mock<IConfiguration>();
        var mockSection = new Mock<IConfigurationSection>();
        mockSection.Setup(s => s["SecretKey"]).Returns("YourSuperSecretKeyForAIStartupCoach2026MustBeAtLeast32Chars!");
        mockSection.Setup(s => s["Issuer"]).Returns("TestIssuer");
        mockSection.Setup(s => s["Audience"]).Returns("TestAudience");
        mockSection.Setup(s => s["ExpirationInMinutes"]).Returns("60");
        
        _mockConfig.Setup(c => c.GetSection("JwtSettings")).Returns(mockSection.Object);

        _service = new AuthService(_mockUserManager.Object, _mockConfig.Object);
    }

    [Fact]
    public async Task RegisterAsync_WithNewEmail_ShouldCreateUserAndReturnToken()
    {
        // Arrange
        var request = new RegisterRequest { Email = "test@example.com", Password = "Password123", FullName = "Test User" };
        
        _mockUserManager.Setup(u => u.FindByEmailAsync(request.Email))
            .ReturnsAsync((ApplicationUser?)null);
            
        _mockUserManager.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), request.Password))
            .ReturnsAsync(IdentityResult.Success);

        // Act
        var result = await _service.RegisterAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Token);
        Assert.Equal(request.Email, result.Email);
        Assert.Equal(request.FullName, result.FullName);
    }

    [Fact]
    public async Task RegisterAsync_WithExistingEmail_ShouldThrowException()
    {
        // Arrange
        var request = new RegisterRequest { Email = "test@example.com", Password = "Password123", FullName = "Test User" };
        var existingUser = new ApplicationUser { Email = request.Email };
        
        _mockUserManager.Setup(u => u.FindByEmailAsync(request.Email))
            .ReturnsAsync(existingUser);

        // Act & Assert
        var ex = await Assert.ThrowsAsync<InvalidOperationException>(() => _service.RegisterAsync(request));
        Assert.Equal("Email đã được sử dụng", ex.Message);
    }

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ShouldReturnToken()
    {
        // Arrange
        var request = new LoginRequest { Email = "test@example.com", Password = "Password123" };
        var user = new ApplicationUser { Id = "1", Email = request.Email, FullName = "Test User" };
        
        _mockUserManager.Setup(u => u.FindByEmailAsync(request.Email))
            .ReturnsAsync(user);
            
        _mockUserManager.Setup(u => u.CheckPasswordAsync(user, request.Password))
            .ReturnsAsync(true);
            
        _mockUserManager.Setup(u => u.UpdateAsync(user))
            .ReturnsAsync(IdentityResult.Success);

        // Act
        var result = await _service.LoginAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Token);
        Assert.Equal(request.Email, result.Email);
        _mockUserManager.Verify(u => u.UpdateAsync(It.Is<ApplicationUser>(u => u.LastLoginAt != null)), Times.Once);
    }
}
