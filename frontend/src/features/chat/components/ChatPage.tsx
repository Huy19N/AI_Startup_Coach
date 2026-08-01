import { useEffect } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { useChat } from '../hooks/useChat';

export const ChatPage = () => {
  const { fetchSessions } = useChat();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="flex-1 flex overflow-hidden">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};
