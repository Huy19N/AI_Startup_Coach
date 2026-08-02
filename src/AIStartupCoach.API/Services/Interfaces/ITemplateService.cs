using AIStartupCoach.API.DTOs.Templates;

namespace AIStartupCoach.API.Services.Interfaces;

public interface ITemplateService
{
    Task<List<PromptTemplateDto>> GetAllTemplatesAsync();
    Task<PromptTemplateDto> GetTemplateByIdAsync(int id);
    Task<PromptTemplateDto> CreateTemplateAsync(CreatePromptTemplateRequest request);
    Task<PromptTemplateDto> UpdateTemplateAsync(int id, UpdatePromptTemplateRequest request);
    Task DeleteTemplateAsync(int id);
}
