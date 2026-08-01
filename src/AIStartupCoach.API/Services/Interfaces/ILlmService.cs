namespace AIStartupCoach.API.Services.Interfaces;

public interface ILlmService
{
    Task<string> SendMessageAsync(string provider, string apiKey, string model, string systemPrompt, List<LlmMessage> messages);
    List<string> GetSupportedProviders();
}

public class LlmMessage
{
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}
