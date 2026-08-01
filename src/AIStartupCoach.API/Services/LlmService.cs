using AIStartupCoach.API.Services.Interfaces;
using AIStartupCoach.API.Services.LlmProviders;

namespace AIStartupCoach.API.Services;

public class LlmService : ILlmService
{
    private readonly IEnumerable<ILlmProvider> _providers;

    public LlmService(IEnumerable<ILlmProvider> providers)
    {
        _providers = providers;
    }

    public async Task<string> SendMessageAsync(string providerName, string apiKey, string systemPrompt, List<LlmMessage> messages)
    {
        var provider = _providers.FirstOrDefault(p => p.ProviderName.Equals(providerName, StringComparison.OrdinalIgnoreCase));
        
        if (provider == null)
            throw new NotSupportedException($"Provider '{providerName}' is not supported.");

        return await provider.SendAsync(apiKey, systemPrompt, messages);
    }

    public List<string> GetSupportedProviders()
    {
        return _providers.Select(p => p.ProviderName).ToList();
    }
}
