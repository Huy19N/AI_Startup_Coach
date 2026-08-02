using AIStartupCoach.API.Data;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIStartupCoach.API.Repositories;

public class TemplateRepository : ITemplateRepository
{
    private readonly AppDbContext _context;

    public TemplateRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PromptTemplate>> GetAllAsync()
    {
        return await _context.PromptTemplates.ToListAsync();
    }

    public async Task<PromptTemplate?> GetByIdAsync(int id)
    {
        return await _context.PromptTemplates.FindAsync(id);
    }

    public async Task<PromptTemplate?> GetActiveTemplateByTypeAsync(string documentType)
    {
        return await _context.PromptTemplates
            .Where(t => t.DocumentType == documentType && t.IsActive)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<PromptTemplate> AddAsync(PromptTemplate template)
    {
        _context.PromptTemplates.Add(template);
        await _context.SaveChangesAsync();
        return template;
    }

    public async Task UpdateAsync(PromptTemplate template)
    {
        _context.PromptTemplates.Update(template);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var template = await _context.PromptTemplates.FindAsync(id);
        if (template != null)
        {
            _context.PromptTemplates.Remove(template);
            await _context.SaveChangesAsync();
        }
    }
}
