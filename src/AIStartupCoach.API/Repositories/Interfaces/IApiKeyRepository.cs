using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Repositories.Interfaces;

public interface IApiKeyRepository
{
    Task<List<ApiKey>> GetByUserIdAsync(string userId);
    Task<ApiKey?> GetByUserAndProviderAsync(string userId, string provider);
    Task<ApiKey?> GetByIdAsync(int id);
    Task<ApiKey> CreateAsync(ApiKey apiKey);
    Task<bool> DeleteAsync(int id);
}
