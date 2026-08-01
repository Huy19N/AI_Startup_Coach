using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services.LlmProviders;

public class GroqProvider : ILlmProvider
{
    private readonly HttpClient _httpClient;

    public GroqProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string ProviderName => "groq";

    public async Task<string> SendAsync(string apiKey, string model, string systemPrompt, List<LlmMessage> messages)
    {
        var requestMessages = new List<object>
        {
            new { role = "system", content = systemPrompt }
        };

        foreach (var msg in messages)
        {
            requestMessages.Add(new { role = msg.Role, content = msg.Content });
        }

        if (string.IsNullOrWhiteSpace(model))
        {
            model = "llama3-8b-8192";
        }
        var requestBody = new
        {
            model = model, // Groq fast model
            messages = requestMessages,
            temperature = 0.7
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.groq.com/openai/v1/chat/completions");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Groq API Error ({response.StatusCode}): {responseContent}");
        }

        using var jsonDoc = JsonDocument.Parse(responseContent);
        return jsonDoc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? string.Empty;
    }
}
