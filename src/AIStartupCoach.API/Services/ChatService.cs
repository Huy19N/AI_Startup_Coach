using AIStartupCoach.API.DTOs.Chat;
using AIStartupCoach.API.Entities;
using AIStartupCoach.API.Helpers;

using AIStartupCoach.API.Repositories.Interfaces;
using AIStartupCoach.API.Services.Interfaces;

namespace AIStartupCoach.API.Services;

public class ChatService : IChatService
{
    private readonly IChatRepository _chatRepository;
    private readonly IApiKeyService _apiKeyService;
    private readonly ILlmService _llmService;
    private readonly IDocumentRepository _documentRepository;

    private readonly ITemplateRepository _templateRepository;

    public ChatService(
        IChatRepository chatRepository, 
        IApiKeyService apiKeyService, 
        ILlmService llmService,
        IDocumentRepository documentRepository,
        ITemplateRepository templateRepository)
    {
        _chatRepository = chatRepository;
        _apiKeyService = apiKeyService;
        _llmService = llmService;
        _documentRepository = documentRepository;
        _templateRepository = templateRepository;
    }

    public async Task<List<ChatSessionResponse>> GetUserSessionsAsync(string userId)
    {
        var sessions = await _chatRepository.GetSessionsByUserIdAsync(userId);
        return sessions.Select(s => new ChatSessionResponse
        {
            Id = s.Id,
            Title = s.Title,
            IdeaSummary = s.IdeaSummary,
            Stage = s.Stage,
            CreatedAt = s.CreatedAt,
            UpdatedAt = s.UpdatedAt,
            MessageCount = s.Messages.Count,
            Documents = s.Documents.Select(d => new DocumentResponse
            {
                Id = d.Id,
                ChatSessionId = d.ChatSessionId,
                Type = d.Type,
                Content = d.Content,
                CreatedAt = d.CreatedAt
            }).ToList()
        }).ToList();
    }

    public async Task<ChatSessionResponse> CreateSessionAsync(string userId, CreateSessionRequest request)
    {
        var session = new ChatSession
        {
            UserId = userId,
            Title = string.IsNullOrWhiteSpace(request.Title) ? "Cuộc trò chuyện mới" : request.Title,
            Stage = "clarifying",
            CreatedAt = DateTime.UtcNow
        };

        var created = await _chatRepository.CreateSessionAsync(session);
        return new ChatSessionResponse
        {
            Id = created.Id,
            Title = created.Title,
            IdeaSummary = created.IdeaSummary,
            Stage = created.Stage,
            CreatedAt = created.CreatedAt,
            UpdatedAt = created.UpdatedAt,
            MessageCount = 0,
            Documents = new List<DocumentResponse>()
        };
    }

    public async Task<List<ChatMessageResponse>> GetSessionMessagesAsync(string userId, int sessionId)
    {
        var session = await _chatRepository.GetSessionByIdAsync(sessionId);
        if (session == null || session.UserId != userId)
            throw new UnauthorizedAccessException("Không có quyền truy cập cuộc trò chuyện này");

        var messages = await _chatRepository.GetMessagesBySessionIdAsync(sessionId);
        return messages.Select(m => new ChatMessageResponse
        {
            Id = m.Id,
            Role = m.Role,
            Content = m.Content,
            CreatedAt = m.CreatedAt
        }).ToList();
    }

    public async Task<SendMessageResponse> SendMessageAsync(string userId, int sessionId, SendMessageRequest request)
    {
        var session = await _chatRepository.GetSessionByIdAsync(sessionId);
        if (session == null || session.UserId != userId)
            throw new UnauthorizedAccessException("Không có quyền truy cập cuộc trò chuyện này");

        // Get API key for the requested provider
        var (apiKey, model) = await _apiKeyService.GetApiKeyDetailsAsync(userId, request.Provider);
        if (string.IsNullOrEmpty(apiKey))
            throw new UnauthorizedAccessException($"Không tìm thấy API Key khả dụng cho nhà cung cấp '{request.Provider}'. Vui lòng thêm API Key trước khi chat.");


        // Get chat history for context
        var history = await _chatRepository.GetMessagesBySessionIdAsync(sessionId);
        var llmMessages = history.Select(m => new LlmMessage { Role = m.Role, Content = m.Content }).ToList();
        
        // Add current user message
        llmMessages.Add(new LlmMessage { Role = "user", Content = request.Message });

        // Save user message to DB
        var userMessage = new ChatMessage
        {
            ChatSessionId = sessionId,
            Role = "user",
            Content = request.Message,
            CreatedAt = DateTime.UtcNow
        };
        await _chatRepository.AddMessageAsync(userMessage);

        // Update session title if it's the first message
        if (history.Count == 0 && session.Title == "Cuộc trò chuyện mới")
        {
            session.Title = request.Message.Length > 30 ? request.Message.Substring(0, 30) + "..." : request.Message;
            session.UpdatedAt = DateTime.UtcNow;
            await _chatRepository.UpdateSessionAsync(session);
        }

        // Update stage if provided
        if (!string.IsNullOrEmpty(request.TargetStage))
        {
            var validStages = new[] { "clarifying", "planning", "executing" };
            if (!validStages.Contains(request.TargetStage))
                throw new ArgumentException($"TargetStage không hợp lệ. Các giá trị cho phép: {string.Join(", ", validStages)}");

            session.Stage = request.TargetStage;
            session.UpdatedAt = DateTime.UtcNow;
            await _chatRepository.UpdateSessionAsync(session);
        }

        // Get system prompt
        string systemPrompt = await GetSystemPromptAsync(session.Stage);



        // Call LLM
        string aiResponseText;
        try
        {
            aiResponseText = await _llmService.SendMessageAsync(request.Provider, apiKey, model ?? string.Empty, systemPrompt, llmMessages);

        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Lỗi khi gọi {request.Provider}: {ex.Message}");
        }

        // Parse XML Tags (IdeaSummary & Documents)
        var newSummary = TagParserHelper.ExtractIdeaSummary(aiResponseText);
        if (!string.IsNullOrWhiteSpace(newSummary))
        {
            session.IdeaSummary = newSummary;
            session.UpdatedAt = DateTime.UtcNow;
            await _chatRepository.UpdateSessionAsync(session);
        }

        var extractedDocs = TagParserHelper.ExtractDocuments(aiResponseText);

        // Safety Review (Cách B)
        bool needsSafetyReview = extractedDocs.Any(d => d.Type == "FundraisingGuide" || d.Type == "PitchOutline");
        if (needsSafetyReview)
        {
            string safetyPrompt = await GetSafetyReviewPromptAsync();
            var safetyMessages = new List<LlmMessage>
            {
                new LlmMessage { Role = "user", Content = $"Đây là kết quả dự thảo cần duyệt:\n\n{aiResponseText}" }
            };
            
            try
            {
                string safetyResponse = await _llmService.SendMessageAsync(request.Provider, apiKey, model ?? string.Empty, safetyPrompt, safetyMessages);

                if (!safetyResponse.Contains("PASS"))
                {
                    llmMessages.Add(new LlmMessage { Role = "assistant", Content = aiResponseText });
                    llmMessages.Add(new LlmMessage { Role = "user", Content = $"Kết quả của bạn không vượt qua kiểm duyệt an toàn. Các lỗi cần sửa:\n{safetyResponse}\n\nHãy sinh lại toàn bộ câu trả lời, sửa các lỗi trên." });
                    aiResponseText = await _llmService.SendMessageAsync(request.Provider, apiKey, model ?? string.Empty, systemPrompt, llmMessages);

                    extractedDocs = TagParserHelper.ExtractDocuments(aiResponseText);
                }
            }
            catch (Exception)
            {
                // Ignore safety review errors
            }
        }

        var createdDocuments = new List<DocumentResponse>();

        foreach (var doc in extractedDocs)
        {
            var newDoc = new Document
            {
                ChatSessionId = sessionId,
                Type = doc.Type,
                Content = doc.Content,
                CreatedAt = DateTime.UtcNow
            };
            var added = await _documentRepository.AddDocumentAsync(newDoc);
            await _documentRepository.AddVersionAsync(new DocumentVersion
            {
                DocumentId = added.Id,
                Content = added.Content,
                CreatedAt = added.CreatedAt
            });
            createdDocuments.Add(new DocumentResponse
            {
                Id = added.Id,
                ChatSessionId = added.ChatSessionId,
                Type = added.Type,
                Content = added.Content,
                CreatedAt = added.CreatedAt
            });
        }

        // Clean output message by stripping special XML tags
        var cleanedResponseText = TagParserHelper.StripTags(aiResponseText);

        // Save AI response to DB
        var aiMessage = new ChatMessage
        {
            ChatSessionId = sessionId,
            Role = "assistant",
            Content = cleanedResponseText,
            CreatedAt = DateTime.UtcNow
        };
        await _chatRepository.AddMessageAsync(aiMessage);



        return new SendMessageResponse
        {
            UserMessage = new ChatMessageResponse
            {
                Id = userMessage.Id,
                Role = userMessage.Role,
                Content = userMessage.Content,
                CreatedAt = userMessage.CreatedAt
            },
            AssistantMessage = new ChatMessageResponse
            {
                Id = aiMessage.Id,
                Role = aiMessage.Role,
                Content = aiMessage.Content,
                CreatedAt = aiMessage.CreatedAt
            },
            IdeaSummary = session.IdeaSummary,
            Stage = session.Stage,
            NewDocuments = createdDocuments
        };
    }

    public async Task<bool> DeleteSessionAsync(string userId, int sessionId)
    {
        var session = await _chatRepository.GetSessionByIdAsync(sessionId);
        if (session == null || session.UserId != userId)
            return false;

        return await _chatRepository.DeleteSessionAsync(sessionId);
    }

    private async Task<string> GetSystemPromptAsync(string stage)
    {
        var constitutionTemplate = await _templateRepository.GetActiveTemplateByTypeAsync("Constitution");
        string constitution = constitutionTemplate?.SystemPrompt ?? "Bạn là AI Startup Coach.";

        string phaseType = stage switch
        {
            "clarifying" => "CoachClarify",
            "planning" => "CoachPlan",
            "executing" => "CoachExecute",
            _ => "CoachClarify"
        };

        var phaseTemplate = await _templateRepository.GetActiveTemplateByTypeAsync(phaseType);
        string phasePrompt = phaseTemplate?.SystemPrompt ?? "";

        return constitution + "\n\n---\n\n" + phasePrompt;
    }

    private async Task<string> GetSafetyReviewPromptAsync()
    {
        var template = await _templateRepository.GetActiveTemplateByTypeAsync("CoachSafetyReview");
        return template?.SystemPrompt ?? "Bạn là một Safety Reviewer. Hãy duyệt kỹ tài liệu.";
    }
}
