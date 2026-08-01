import axiosInstance from '@/shared/utils/axiosInstance';
import { ChatMessage, ChatSession } from '../types/chat.types';

export const chatService = {
  async getSessions(): Promise<ChatSession[]> {
    const response = await axiosInstance.get('/chat/sessions');
    return response.data;
  },

  async createSession(title: string): Promise<ChatSession> {
    const response = await axiosInstance.post('/chat/sessions', { title });
    return response.data;
  },

  async getSessionHistory(sessionId: string): Promise<ChatMessage[]> {
    const response = await axiosInstance.get(`/chat/sessions/${sessionId}/history`);
    return response.data;
  },

  async sendMessage(sessionId: string, provider: string, content: string): Promise<ChatMessage> {
    const response = await axiosInstance.post(`/chat/sessions/${sessionId}/message`, {
      provider,
      content,
    });
    return response.data;
  },
};
