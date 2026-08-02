export interface PromptTemplate {
  id: number;
  documentType: string;
  systemPrompt: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreatePromptTemplateRequest {
  documentType: string;
  systemPrompt: string;
  isActive: boolean;
}

export interface UpdatePromptTemplateRequest {
  documentType: string;
  systemPrompt: string;
  isActive: boolean;
}
