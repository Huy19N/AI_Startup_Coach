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

        var mergedMessages = new List<LlmMessage>();
        foreach (var msg in messages)
        {
            if (mergedMessages.Count > 0 && mergedMessages.Last().Role == msg.Role)
            {
                mergedMessages.Last().Content += "\n\n" + msg.Content;
            }
            else
            {
                mergedMessages.Add(new LlmMessage { Role = msg.Role, Content = msg.Content });
            }
        }

        foreach (var msg in mergedMessages)
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
            model = "gemini-flash-latest";
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
        var candidates = jsonDoc.RootElement.GetProperty("candidates");
        if (candidates.GetArrayLength() == 0) return string.Empty;

        var firstCandidate = candidates[0];
        if (!firstCandidate.TryGetProperty("content", out var contentObj))
        {
            // Possibly blocked by safety filter
            return "Xin lỗi, câu trả lời đã bị chặn bởi bộ lọc an toàn của Google Gemini.";
        }

        if (!contentObj.TryGetProperty("parts", out var parts) || parts.GetArrayLength() == 0)
        {
            return string.Empty;
        }

        if (!parts[0].TryGetProperty("text", out var textProp))
        {
            return string.Empty;
        }

        return textProp.GetString() ?? string.Empty;
    }
}
