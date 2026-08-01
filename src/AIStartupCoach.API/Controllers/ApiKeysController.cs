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

    public ApiKeysController(IApiKeyService apiKeyService)
    {
        _apiKeyService = apiKeyService;
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
}
