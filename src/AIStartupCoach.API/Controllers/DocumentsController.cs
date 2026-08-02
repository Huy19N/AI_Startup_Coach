using System.Security.Claims;
using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.DTOs.Documents;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIStartupCoach.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DocumentsController : ControllerBase
{
    private readonly IDocumentService _documentService;

    public DocumentsController(IDocumentService documentService)
    {
        _documentService = documentService;
    }

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpPost("{id}/versions")]
    public async Task<ActionResult<DocumentVersionResponse>> CreateVersion(int id, [FromBody] CreateVersionRequest request)
    {
        try
        {
            var result = await _documentService.CreateVersionAsync(UserId, id, request);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
    }

    [HttpGet("{id}/versions")]
    public async Task<ActionResult<List<DocumentVersionResponse>>> GetVersions(int id)
    {
        try
        {
            var result = await _documentService.GetVersionsAsync(UserId, id);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
    }

    [HttpPost("{id}/feedback")]
    public async Task<ActionResult<DocumentResponse>> ProvideFeedback(int id, [FromBody] DocumentFeedbackRequest request)
    {
        try
        {
            var result = await _documentService.ProvideFeedbackAsync(id, UserId, request);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
    }
}
