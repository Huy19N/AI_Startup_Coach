using System.Text;
using System.Text.Json;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services.LlmProviders;

public class GeminiProvider : ILlmProvider
{
    private readonly HttpClient _httpClient;

    public GeminiProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string ProviderName => "gemini";

    public async Task<string> SendAsync(string apiKey, string model, string systemPrompt, List<LlmMessage> messages)
    {
        var contents = new List<object>();

        // Gemini handles system instructions separately (available in Gemini 1.5)
        var systemInstruction = new
        {
            parts = new[] { new { text = systemPrompt } }
        };

        foreach (var msg in messages)
        {
            contents.Add(new
            {
                role = msg.Role == "assistant" ? "model" : "user",
                parts = new[] { new { text = msg.Content } }
            });
        }

        var requestBody = new
        {
            systemInstruction = systemInstruction,
            contents = contents,
            generationConfig = new { temperature = 0.7 }
        };

        if (string.IsNullOrWhiteSpace(model))
        {
            model = "gemini-1.5-flash";
        }
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";
        
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Gemini API Error ({response.StatusCode}): {responseContent}");
        }

        using var jsonDoc = JsonDocument.Parse(responseContent);
        return jsonDoc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;
    }
}
