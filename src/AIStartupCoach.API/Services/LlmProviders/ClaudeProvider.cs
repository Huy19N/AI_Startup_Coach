using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services.LlmProviders;

public class ClaudeProvider : ILlmProvider
{
    private readonly HttpClient _httpClient;

    public ClaudeProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string ProviderName => "claude";

    public async Task<string> SendAsync(string apiKey, string model, string systemPrompt, List<LlmMessage> messages)
    {
        var requestMessages = new List<object>();

        foreach (var msg in messages)
        {
            requestMessages.Add(new { role = msg.Role, content = msg.Content });
        }

        if (string.IsNullOrWhiteSpace(model))
        {
            model = "claude-3-haiku-20240307";
        }
        var requestBody = new
        {
            model = model, // Fast model
            system = systemPrompt,
            messages = requestMessages,
            max_tokens = 4096,
            temperature = 0.7
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
        request.Headers.Add("x-api-key", apiKey);
        request.Headers.Add("anthropic-version", "2023-06-01");
        request.Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Claude API Error ({response.StatusCode}): {responseContent}");
        }

        using var jsonDoc = JsonDocument.Parse(responseContent);
        return jsonDoc.RootElement
            .GetProperty("content")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;
    }
}
