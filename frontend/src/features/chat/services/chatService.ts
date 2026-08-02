import axiosInstance from '@/shared/utils/axiosInstance';
import { ChatMessage, ChatSession, DocumentItem } from '../types/chat.types';

export interface SendMessageResponseData {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  ideaSummary?: string | null;
  newDocuments?: DocumentItem[];
}

export const chatService = {
  async getSessions(): Promise<ChatSession[]> {
    const response = await axiosInstance.get('/chat/sessions');
    return response.data;
  },

  async createSession(title: string): Promise<ChatSession> {
    const response = await axiosInstance.post('/chat/sessions', { title });
    return response.data;
  },

  async getSessionHistory(sessionId: string | number): Promise<ChatMessage[]> {
    const response = await axiosInstance.get(`/chat/sessions/${sessionId}/messages`);
    return response.data;
  },

  async sendMessage(sessionId: string | number, provider: string, message: string): Promise<SendMessageResponseData> {
    const response = await axiosInstance.post(`/chat/sessions/${sessionId}/messages`, {
      provider,
      message,
    });
    return response.data;
  },
};
