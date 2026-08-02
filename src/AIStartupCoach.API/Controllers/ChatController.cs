using System.Security.Claims;
using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIStartupCoach.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly ILlmService _llmService;

    public ChatController(IChatService chatService, ILlmService llmService)
    {
        _chatService = chatService;
        _llmService = llmService;
    }

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpGet("sessions")]
    public async Task<ActionResult<List<ChatSessionResponse>>> GetUserSessions()
    {
        var sessions = await _chatService.GetUserSessionsAsync(UserId);
        return Ok(sessions);
    }

    [HttpPost("sessions")]
    public async Task<ActionResult<ChatSessionResponse>> CreateSession([FromBody] CreateSessionRequest request)
    {
        var session = await _chatService.CreateSessionAsync(UserId, request);
        return Ok(session);
    }

    [HttpGet("sessions/{sessionId}/messages")]
    public async Task<ActionResult<List<ChatMessageResponse>>> GetSessionMessages(int sessionId)
    {
        try
        {
            var messages = await _chatService.GetSessionMessagesAsync(UserId, sessionId);
            return Ok(messages);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
    }

    [HttpPost("sessions/{sessionId}/messages")]
    public async Task<ActionResult<SendMessageResponse>> SendMessage(int sessionId, [FromBody] SendMessageRequest request)
    {
        try
        {
            var response = await _chatService.SendMessageAsync(UserId, sessionId, request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("sessions/{sessionId}")]
    public async Task<ActionResult> DeleteSession(int sessionId)
    {
        var success = await _chatService.DeleteSessionAsync(UserId, sessionId);
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpGet("providers")]
    public ActionResult<List<string>> GetSupportedProviders()
    {
        var providers = _llmService.GetSupportedProviders();
        return Ok(providers);
    }
}
