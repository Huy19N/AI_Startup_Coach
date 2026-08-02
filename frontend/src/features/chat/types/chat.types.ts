export interface DocumentItem {
  id: number;
  chatSessionId: number;
  type: string; // 'LeanCanvas' | 'SWOT' | 'BMC' | 'MVPPlan' | 'MarketingStrategy' | 'PitchOutline' | 'FundraisingGuide'
  content: string;
  createdAt: string;
}

export interface DocumentVersionItem {
  id: number;
  documentId: number;
  content: string;
  createdAt: string;
}

export interface ChatMessage {
  id: number | string;
  role: 'User' | 'AI' | 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: number | string;
  title: string;
  ideaSummary?: string | null;
  createdAt: string;
  lastMessageAt?: string | null;
  updatedAt?: string | null;
  messageCount?: number;
  documents?: DocumentItem[];
}

export interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  documents: DocumentItem[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}
