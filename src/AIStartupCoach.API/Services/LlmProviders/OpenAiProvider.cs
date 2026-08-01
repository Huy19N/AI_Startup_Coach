using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services.LlmProviders;

public class OpenAiProvider : ILlmProvider
{
    private readonly HttpClient _httpClient;

    public OpenAiProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string ProviderName => "openai";

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
            model = "gpt-4o-mini";
        }
        var requestBody = new
        {
            model = model, // Default fast model
            messages = requestMessages,
            temperature = 0.7
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"OpenAI API Error ({response.StatusCode}): {responseContent}");
        }

        using var jsonDoc = JsonDocument.Parse(responseContent);
        return jsonDoc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? string.Empty;
    }
}
