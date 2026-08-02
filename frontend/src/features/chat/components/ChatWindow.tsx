import { useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import { useChatStore } from '../stores/chatStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Rocket, AlertCircle, X } from 'lucide-react';

export const ChatWindow = () => {
  const { currentSession, messages, isLoading, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setError } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, error]);

  if (!currentSession && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Rocket className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Chào mừng đến với AI Startup Coach</h2>
        <p className="text-muted-foreground max-w-md">
          Hãy tạo một cuộc trò chuyện mới để bắt đầu. AI Coach sẽ giúp bạn xây dựng, đánh giá và phát triển ý tưởng khởi nghiệp của mình.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background h-full overflow-hidden">
      <div className="border-b border-border bg-card/80 backdrop-blur px-6 py-4 flex items-center shadow-sm z-10 sticky top-0 shrink-0">
        <h2 className="font-semibold truncate">
          {currentSession?.title || 'Đang tải...'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <Rocket className="w-12 h-12 opacity-20 mb-4" />
            <p>Cuộc trò chuyện mới. Hãy gửi tin nhắn đầu tiên của bạn!</p>
          </div>
        ) : (
          <div className="flex flex-col pb-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {error && (
        <div className="mx-6 mb-4 mt-2 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-600 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="flex-1 text-sm font-medium">
            {error}
          </div>
          <button 
            onClick={() => setError(null)}
            className="p-1 hover:bg-rose-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <ChatInput />
    </div>
  );
};
