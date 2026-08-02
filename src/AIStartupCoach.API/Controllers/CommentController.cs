using System.Security.Claims;
using AIStartupCoach.API.Models.Requests;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIStartupCoach.API.Controllers;

[ApiController]
[Route("api/documents/{documentId}/comments")]
[Authorize]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetComments(int documentId)
    {
        var comments = await _commentService.GetCommentsByDocumentIdAsync(documentId);
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment(int documentId, [FromBody] CreateCommentRequest request)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var comment = await _commentService.CreateCommentAsync(documentId, userId, request);
            return Ok(comment);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
