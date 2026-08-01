import { create } from 'zustand';
import { ChatMessage, ChatSession, ChatState } from '../types/chat.types';

interface ChatStore extends ChatState {
  setSessions: (sessions: ChatSession[]) => void;
  setCurrentSession: (session: ChatSession | null) => void;
  addSession: (session: ChatSession) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setLoading: (isLoading: boolean) => void;
  setSending: (isSending: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,
  setSessions: (sessions) => set({ sessions, error: null }),
  setCurrentSession: (session) => set({ currentSession: session, error: null }),
  addSession: (session) => set((state) => ({ 
    sessions: [session, ...state.sessions],
    currentSession: session,
    messages: [] 
  })),
  setMessages: (messages) => set({ messages, error: null }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message], error: null })),
  setLoading: (isLoading) => set({ isLoading }),
  setSending: (isSending) => set({ isSending }),
  setError: (error) => set({ error }),
}));
