using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIStartupCoach.API.Repositories;

public class ApiKeyRepository : IApiKeyRepository
{
    private readonly AppDbContext _context;

    public ApiKeyRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ApiKey>> GetByUserIdAsync(string userId)
    {
        return await _context.ApiKeys
            .Where(k => k.UserId == userId)
            .OrderBy(k => k.Provider)
            .ToListAsync();
    }

    public async Task<ApiKey?> GetByUserAndProviderAsync(string userId, string provider)
    {
        return await _context.ApiKeys
            .FirstOrDefaultAsync(k => k.UserId == userId && k.Provider == provider);
    }

    public async Task<ApiKey?> GetByIdAsync(int id)
    {
        return await _context.ApiKeys.FindAsync(id);
    }

    public async Task<ApiKey> CreateAsync(ApiKey apiKey)
    {
        _context.ApiKeys.Add(apiKey);
        await _context.SaveChangesAsync();
        return apiKey;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var apiKey = await _context.ApiKeys.FindAsync(id);
        if (apiKey == null) return false;

        _context.ApiKeys.Remove(apiKey);
        await _context.SaveChangesAsync();
        return true;
    }
}
