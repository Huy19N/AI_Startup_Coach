using AIStartupCoach.API.DTOs.ApiKeys;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Helpers;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services;

public class ApiKeyService : IApiKeyService
{
    private readonly IApiKeyRepository _repository;
    private readonly IEncryptionHelper _encryptionHelper;

    public ApiKeyService(IApiKeyRepository repository, IEncryptionHelper encryptionHelper)
    {
        _repository = repository;
        _encryptionHelper = encryptionHelper;
    }

    public async Task<List<ApiKeyResponse>> GetUserApiKeysAsync(string userId)
    {
        var keys = await _repository.GetByUserIdAsync(userId);
        return keys.Select(MapToResponse).ToList();
    }

    public async Task<ApiKeyResponse> CreateApiKeyAsync(string userId, CreateApiKeyRequest request)
    {
        // Check if user already has key for this provider
        var existing = await _repository.GetByUserAndProviderAsync(userId, request.Provider);
        if (existing != null)
        {
            // Update existing key
            existing.EncryptedKey = _encryptionHelper.Encrypt(request.ApiKey);
            existing.DisplayName = request.DisplayName;
            existing.UpdatedAt = DateTime.UtcNow;
            // Since we're updating in-place, we need to save through context
            // For simplicity, delete and recreate
            await _repository.DeleteAsync(existing.Id);
        }

        var apiKey = new ApiKey
        {
            UserId = userId,
            Provider = request.Provider,
            EncryptedKey = _encryptionHelper.Encrypt(request.ApiKey),
            DisplayName = string.IsNullOrEmpty(request.DisplayName)
                ? $"{request.Provider} API Key"
                : request.DisplayName,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(apiKey);
        return MapToResponse(created);
    }

    public async Task<bool> DeleteApiKeyAsync(string userId, int apiKeyId)
    {
        var apiKey = await _repository.GetByIdAsync(apiKeyId);
        if (apiKey == null || apiKey.UserId != userId)
            return false;

        return await _repository.DeleteAsync(apiKeyId);
    }

    public async Task<string?> GetDecryptedKeyAsync(string userId, string provider)
    {
        var apiKey = await _repository.GetByUserAndProviderAsync(userId, provider);
        if (apiKey == null || !apiKey.IsActive)
            return null;

        return _encryptionHelper.Decrypt(apiKey.EncryptedKey);
    }

    private static ApiKeyResponse MapToResponse(ApiKey apiKey)
    {
        return new ApiKeyResponse
        {
            Id = apiKey.Id,
            Provider = apiKey.Provider,
            MaskedKey = MaskKey(apiKey.EncryptedKey),
            DisplayName = apiKey.DisplayName,
            IsActive = apiKey.IsActive,
            CreatedAt = apiKey.CreatedAt
        };
    }

    private static string MaskKey(string encryptedKey)
    {
        // Show only first 4 and last 4 characters of the encrypted form
        if (encryptedKey.Length <= 8)
            return "****";

        return $"{encryptedKey[..4]}...{encryptedKey[^4..]}";
    }
}
