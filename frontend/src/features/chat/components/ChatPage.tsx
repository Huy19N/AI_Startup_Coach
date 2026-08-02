import { useEffect, useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { RightPanel } from './RightPanel';
import { useChat } from '../hooks/useChat';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';

export const ChatPage = () => {
  const { fetchSessions } = useChat();
  const [showRightPanel, setShowRightPanel] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="flex-1 flex overflow-hidden relative">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute top-3 right-4 z-10 hidden sm:block">
          <button
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="p-1.5 rounded-lg bg-background/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title={showRightPanel ? "Ẩn bảng thông tin" : "Hiện bảng thông tin"}
          >
            {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
        <ChatWindow />
      </div>
      {showRightPanel && <RightPanel />}
    </div>
  );
};
