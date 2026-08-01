using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services.LlmProviders;

public interface ILlmProvider
{
    string ProviderName { get; }
    Task<string> SendAsync(string apiKey, string systemPrompt, List<LlmMessage> messages);
}
