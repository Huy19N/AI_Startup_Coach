import { useCallback } from 'react';
import { useChatStore } from '../stores/chatStore';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const store = useChatStore();

  const fetchSessions = useCallback(async () => {
    store.setLoading(true);
    try {
      const data = await chatService.getSessions();
      store.setSessions(data);
      if (data.length > 0 && !store.currentSession) {
        store.setCurrentSession(data[0]);
        await loadSessionHistory(data[0].id);
      }
    } catch (err: any) {
      store.setError(err.response?.data?.message || 'Lỗi khi tải danh sách chat');
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const loadSessionHistory = async (sessionId: string) => {
    store.setLoading(true);
    try {
      const data = await chatService.getSessionHistory(sessionId);
      store.setMessages(data);
    } catch (err: any) {
      store.setError(err.response?.data?.message || 'Lỗi khi tải lịch sử chat');
    } finally {
      store.setLoading(false);
    }
  };

  const selectSession = async (sessionId: string) => {
    const session = store.sessions.find(s => s.id === sessionId);
    if (session) {
      store.setCurrentSession(session);
      await loadSessionHistory(sessionId);
    }
  };

  const createNewSession = async (title: string = 'Cuộc trò chuyện mới') => {
    store.setLoading(true);
    try {
      const newSession = await chatService.createSession(title);
      store.addSession(newSession);
      return newSession;
    } catch (err: any) {
      store.setError(err.response?.data?.message || 'Lỗi khi tạo chat mới');
      return null;
    } finally {
      store.setLoading(false);
    }
  };

  const sendMessage = async (provider: string, content: string) => {
    if (!store.currentSession) return false;
    
    // Optimistic UI for user message
    const tempId = Date.now().toString();
    store.addMessage({
      id: tempId,
      role: 'User',
      content,
      createdAt: new Date().toISOString()
    });

    store.setSending(true);
    try {
      const aiResponse = await chatService.sendMessage(store.currentSession.id, provider, content);
      store.addMessage(aiResponse);
      return true;
    } catch (err: any) {
      store.setError(err.response?.data?.message || 'Lỗi khi gửi tin nhắn');
      return false;
    } finally {
      store.setSending(false);
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
