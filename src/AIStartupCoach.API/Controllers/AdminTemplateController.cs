using AIStartupCoach.API.DTOs.Templates;
using AIStartupCoach.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIStartupCoach.API.Controllers;

[ApiController]
[Route("api/admin/templates")]
[Authorize(Roles = "Admin")]
public class AdminTemplateController : ControllerBase
{
    private readonly ITemplateService _templateService;

    public AdminTemplateController(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PromptTemplateDto>>> GetAll()
    {
        var templates = await _templateService.GetAllTemplatesAsync();
        return Ok(templates);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PromptTemplateDto>> GetById(int id)
    {
        try
        {
            var template = await _templateService.GetTemplateByIdAsync(id);
            return Ok(template);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<PromptTemplateDto>> Create([FromBody] CreatePromptTemplateRequest request)
    {
        var template = await _templateService.CreateTemplateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = template.Id }, template);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PromptTemplateDto>> Update(int id, [FromBody] UpdatePromptTemplateRequest request)
    {
        try
        {
            var template = await _templateService.UpdateTemplateAsync(id, request);
            return Ok(template);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _templateService.DeleteTemplateAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
