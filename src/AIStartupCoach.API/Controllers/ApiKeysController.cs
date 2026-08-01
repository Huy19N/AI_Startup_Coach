using System.Security.Claims;
using AIStartupCoach.API.DTOs.ApiKeys;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIStartupCoach.API.Controllers;

[Authorize]
[ApiController]
[Route("api/api-keys")]
public class ApiKeysController : ControllerBase
{
    private readonly IApiKeyService _apiKeyService;
    private readonly ILlmService _llmService;

    public ApiKeysController(IApiKeyService apiKeyService, ILlmService llmService)
    {
        _apiKeyService = apiKeyService;
        _llmService = llmService;
    }

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpGet]
    public async Task<ActionResult<List<ApiKeyResponse>>> GetUserApiKeys()
    {
        var keys = await _apiKeyService.GetUserApiKeysAsync(UserId);
        return Ok(keys);
    }

    [HttpPost]
    public async Task<ActionResult<ApiKeyResponse>> CreateApiKey([FromBody] CreateApiKeyRequest request)
    {
        var result = await _apiKeyService.CreateApiKeyAsync(UserId, request);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteApiKey(int id)
    {
        var success = await _apiKeyService.DeleteApiKeyAsync(UserId, id);
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpPost("verify")]
    public async Task<ActionResult> VerifyApiKey([FromBody] VerifyApiKeyRequest request)
    {
        try
        {
            var systemPrompt = "You are a tester. You must reply only with the word 'OK'.";
            var messages = new List<LlmMessage>
            {
                new LlmMessage { Role = "User", Content = "Test connection." }
            };
            
            var response = await _llmService.SendMessageAsync(request.Provider, request.ApiKey, request.DefaultModel, systemPrompt, messages);
            
            if (string.IsNullOrWhiteSpace(response))
            {
                return BadRequest(new { message = "Empty response from provider" });
            }

            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"Verification failed: {ex.Message}" });
        }
    }
}
