using AIStartupCoach.API.Entities;

namespace AIStartupCoach.API.Repositories.Interfaces;

public interface ITemplateRepository
{
    Task<List<PromptTemplate>> GetAllAsync();
    Task<PromptTemplate?> GetByIdAsync(int id);
    Task<PromptTemplate?> GetActiveTemplateByTypeAsync(string documentType);
    Task<PromptTemplate> AddAsync(PromptTemplate template);
    Task UpdateAsync(PromptTemplate template);
    Task DeleteAsync(int id);
}
