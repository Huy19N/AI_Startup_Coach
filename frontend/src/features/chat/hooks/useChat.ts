import { useCallback } from 'react';
import { useChatStore } from '../stores/chatStore';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const store = useChatStore();

  const loadSessionHistory = useCallback(async (sessionId: string | number) => {
    const state = useChatStore.getState();
    state.setLoading(true);
    try {
      const data = await chatService.getSessionHistory(sessionId);
      useChatStore.getState().setMessages(data);
    } catch (err: any) {
      useChatStore.getState().setError(err.response?.data?.message || 'Lỗi khi tải lịch sử chat');
    } finally {
      useChatStore.getState().setLoading(false);
    }
  }, []);

  const fetchSessions = useCallback(async () => {
    const state = useChatStore.getState();
    state.setLoading(true);
    try {
      const data = await chatService.getSessions();
      useChatStore.getState().setSessions(data);
      if (data.length > 0 && !useChatStore.getState().currentSession) {
        useChatStore.getState().setCurrentSession(data[0]);
        await loadSessionHistory(data[0].id);
      }
    } catch (err: any) {
      useChatStore.getState().setError(err.response?.data?.message || 'Lỗi khi tải danh sách chat');
    } finally {
      useChatStore.getState().setLoading(false);
    }
  }, [loadSessionHistory]);

  const selectSession = async (sessionId: string | number) => {
    const state = useChatStore.getState();
    const session = state.sessions.find(s => s.id === sessionId);
    if (session) {
      state.setCurrentSession(session);
      await loadSessionHistory(sessionId);
    }
  };

  const createNewSession = async (title: string = 'Cuộc trò chuyện mới') => {
    const state = useChatStore.getState();
    state.setLoading(true);
    try {
      const newSession = await chatService.createSession(title);
      useChatStore.getState().addSession(newSession);
      return newSession;
    } catch (err: any) {
      useChatStore.getState().setError(err.response?.data?.message || 'Lỗi khi tạo chat mới');
      return null;
    } finally {
      useChatStore.getState().setLoading(false);
    }
  };

  const sendMessage = async (provider: string, content: string) => {
    const state = useChatStore.getState();
    if (!state.currentSession) return false;
    
    // Optimistic UI for user message
    const tempId = Date.now();
    state.addMessage({
      id: tempId,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    });

    state.setSending(true);
    try {
      const responseData = await chatService.sendMessage(state.currentSession.id, provider, content);
      
      // Update assistant message
      useChatStore.getState().addMessage(responseData.assistantMessage);
      
      // Update Idea Summary if present
      if (responseData.ideaSummary) {
        useChatStore.getState().updateIdeaSummary(responseData.ideaSummary);
      }

      // Add new Documents if present
      if (responseData.newDocuments && responseData.newDocuments.length > 0) {
        useChatStore.getState().addDocuments(responseData.newDocuments);
      }

      return true;
    } catch (err: any) {
      useChatStore.getState().setError(err.response?.data?.message || 'Lỗi khi gửi tin nhắn');
      useChatStore.getState().setMessages(useChatStore.getState().messages.filter(m => m.id !== tempId));
      return false;
    } finally {
      useChatStore.getState().setSending(false);
    }
  };

  return {
    ...store,
    fetchSessions,
    selectSession,
    createNewSession,
    sendMessage
  };
};
