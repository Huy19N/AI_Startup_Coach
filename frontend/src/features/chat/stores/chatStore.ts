import { create } from 'zustand';
import { ChatMessage, ChatSession, ChatState, DocumentItem } from '../types/chat.types';

interface ChatStore extends ChatState {
  setSessions: (sessions: ChatSession[]) => void;
  setCurrentSession: (session: ChatSession | null) => void;
  addSession: (session: ChatSession) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setDocuments: (documents: DocumentItem[]) => void;
  addDocuments: (documents: DocumentItem[]) => void;
  updateIdeaSummary: (summary: string) => void;
  setLoading: (isLoading: boolean) => void;
  setSending: (isSending: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  documents: [],
  isLoading: false,
  isSending: false,
  error: null,

  setSessions: (sessions) => set({ sessions, error: null }),
  
  setCurrentSession: (session) => set({ 
    currentSession: session, 
    documents: session?.documents || [],
    error: null 
  }),

  addSession: (session) => set((state) => ({ 
    sessions: [session, ...state.sessions],
    currentSession: session,
    messages: [],
    documents: session.documents || []
  })),

  setMessages: (messages) => set({ messages, error: null }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message], error: null })),

  setDocuments: (documents) => set({ documents }),
  addDocuments: (newDocs) => set((state) => ({ 
    documents: [...newDocs, ...state.documents] 
  })),

  updateIdeaSummary: (summary) => set((state) => {
    if (!state.currentSession) return state;
    const updated = { ...state.currentSession, ideaSummary: summary };
    return {
      currentSession: updated,
      sessions: state.sessions.map(s => s.id === updated.id ? updated : s)
    };
  }),

  setLoading: (isLoading) => set({ isLoading }),
  setSending: (isSending) => set({ isSending }),
  setError: (error) => set({ error }),
}));
