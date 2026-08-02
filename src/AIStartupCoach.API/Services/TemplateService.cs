using AIStartupCoach.API.DTOs.Templates;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services;

public class TemplateService : ITemplateService
{
    private readonly ITemplateRepository _templateRepository;

    public TemplateService(ITemplateRepository templateRepository)
    {
        _templateRepository = templateRepository;
    }

    public async Task<List<PromptTemplateDto>> GetAllTemplatesAsync()
    {
        var templates = await _templateRepository.GetAllAsync();
        return templates.Select(MapToDto).ToList();
    }

    public async Task<PromptTemplateDto> GetTemplateByIdAsync(int id)
    {
        var template = await _templateRepository.GetByIdAsync(id);
        if (template == null)
            throw new KeyNotFoundException("Không tìm thấy template");

        return MapToDto(template);
    }

    public async Task<PromptTemplateDto> CreateTemplateAsync(CreatePromptTemplateRequest request)
    {
        var template = new PromptTemplate
        {
            DocumentType = request.DocumentType,
            SystemPrompt = request.SystemPrompt,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _templateRepository.AddAsync(template);
        return MapToDto(created);
    }

    public async Task<PromptTemplateDto> UpdateTemplateAsync(int id, UpdatePromptTemplateRequest request)
    {
        var template = await _templateRepository.GetByIdAsync(id);
        if (template == null)
            throw new KeyNotFoundException("Không tìm thấy template");

        template.DocumentType = request.DocumentType;
        template.SystemPrompt = request.SystemPrompt;
        template.IsActive = request.IsActive;

        await _templateRepository.UpdateAsync(template);
        return MapToDto(template);
    }

    public async Task DeleteTemplateAsync(int id)
    {
        var template = await _templateRepository.GetByIdAsync(id);
        if (template == null)
            throw new KeyNotFoundException("Không tìm thấy template");

        await _templateRepository.DeleteAsync(id);
    }

    private PromptTemplateDto MapToDto(PromptTemplate template)
    {
        return new PromptTemplateDto
        {
            Id = template.Id,
            DocumentType = template.DocumentType,
            SystemPrompt = template.SystemPrompt,
            IsActive = template.IsActive,
            CreatedAt = template.CreatedAt
        };
    }
}
