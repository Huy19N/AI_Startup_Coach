using AIStartupCoach.API.Entities;
using Xunit;

namespace AIStartupCoach.Tests.Entities;

public class ApplicationUserTests
{
    [Fact]
    public void ApplicationUser_ShouldHaveDefaultAiQuotaOf50()
    {
        // Arrange & Act
        var user = new ApplicationUser();

        // Assert
        Assert.Equal(50, user.AiQuota);
    }
}
