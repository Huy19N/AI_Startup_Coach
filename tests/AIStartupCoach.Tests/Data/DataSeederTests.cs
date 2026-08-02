using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace AIStartupCoach.Tests.Data;

public class DataSeederTests
{
    private static Mock<UserManager<TUser>> MockUserManager<TUser>() where TUser : class
    {
        var store = new Mock<IUserStore<TUser>>();
        return new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
    }

    private static Mock<RoleManager<TRole>> MockRoleManager<TRole>() where TRole : class
    {
        var store = new Mock<IRoleStore<TRole>>();
        return new Mock<RoleManager<TRole>>(store.Object, null, null, null, null);
    }

    [Fact]
    public async Task SeedRolesAndAdminAsync_ShouldCreateRolesAndAdminUser()
    {
        // Arrange
        var roleManagerMock = MockRoleManager<IdentityRole>();
        var userManagerMock = MockUserManager<ApplicationUser>();

        roleManagerMock.Setup(x => x.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(false);
        roleManagerMock.Setup(x => x.CreateAsync(It.IsAny<IdentityRole>())).ReturnsAsync(IdentityResult.Success);

        userManagerMock.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((ApplicationUser)null);
        userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
        userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), "Admin")).ReturnsAsync(IdentityResult.Success);

        var serviceCollection = new ServiceCollection();
        serviceCollection.AddSingleton(roleManagerMock.Object);
        serviceCollection.AddSingleton(userManagerMock.Object);
        serviceCollection.AddDbContext<AppDbContext>(options =>
            options.UseInMemoryDatabase(Guid.NewGuid().ToString()));
        
        var serviceProvider = serviceCollection.BuildServiceProvider();

        // Act
        await DataSeeder.SeedRolesAndAdminAsync(serviceProvider);

        // Assert
        roleManagerMock.Verify(x => x.CreateAsync(It.Is<IdentityRole>(r => r.Name == "Admin")), Times.Once);
        roleManagerMock.Verify(x => x.CreateAsync(It.Is<IdentityRole>(r => r.Name == "Mentor")), Times.Once);
        roleManagerMock.Verify(x => x.CreateAsync(It.Is<IdentityRole>(r => r.Name == "Student")), Times.Once);
        
        userManagerMock.Verify(x => x.CreateAsync(It.Is<ApplicationUser>(u => u.Email == "admin@startupcoach.com"), It.IsAny<string>()), Times.Once);
        userManagerMock.Verify(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), "Admin"), Times.Once);
    }
}
