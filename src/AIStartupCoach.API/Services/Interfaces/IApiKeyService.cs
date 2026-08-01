using AIStartupCoach.API.DTOs.ApiKeys;

namespace AIStartupCoach.API.Services.Interfaces;

public interface IApiKeyService
{
    Task<List<ApiKeyResponse>> GetUserApiKeysAsync(string userId);
    Task<ApiKeyResponse> CreateApiKeyAsync(string userId, CreateApiKeyRequest request);
    Task<bool> DeleteApiKeyAsync(string userId, int apiKeyId);
    Task<string?> GetDecryptedKeyAsync(string userId, string provider);
}
