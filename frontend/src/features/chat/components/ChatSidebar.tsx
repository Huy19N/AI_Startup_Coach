import { MessageSquare, Plus, MessagesSquare } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export const ChatSidebar = () => {
  const { sessions, currentSession, selectSession, createNewSession, isLoading } = useChat();

  return (
    <div className="w-72 bg-card border-r border-border flex flex-col h-full shrink-0 animate-in slide-in-from-left-8 duration-300">
      <div className="p-4 border-b border-border shrink-0">
        <button
          onClick={() => createNewSession()}
          disabled={isLoading}
          className="w-full flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2.5 px-4 rounded-lg font-medium transition-all disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          Tạo cuộc trò chuyện
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.length === 0 && !isLoading ? (
          <div className="text-center p-4 mt-4 text-muted-foreground">
            <MessagesSquare className="w-10 h-10 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Chưa có cuộc trò chuyện nào</p>
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => selectSession(session.id)}
              className={`w-full text-left p-3 rounded-lg flex gap-3 transition-colors ${
                currentSession?.id === session.id
                  ? 'bg-secondary text-secondary-foreground border border-border/50 shadow-sm'
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
            >
              <MessageSquare className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentSession?.id === session.id ? 'text-primary' : ''}`} />
              <div className="overflow-hidden">
                <div className="font-medium truncate text-sm">{session.title}</div>
                <div className="text-xs opacity-70 mt-1">
                  {session.lastMessageAt ? formatDistanceToNow(new Date(session.lastMessageAt), { addSuffix: true, locale: vi }) : ''}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
