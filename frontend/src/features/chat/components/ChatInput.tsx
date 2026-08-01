import { useState, KeyboardEvent, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useApiKeys } from '@/features/api-keys/hooks/useApiKeys';
import { Link } from 'react-router-dom';

export const ChatInput = () => {
  const [content, setContent] = useState('');
  const [provider, setProvider] = useState('');
  const { sendMessage, isSending } = useChat();
  const { keys, fetchKeys } = useApiKeys();

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  useEffect(() => {
    if (keys.length > 0 && !provider) {
      setProvider(keys[0].provider);
    }
  }, [keys, provider]);

  const handleSend = () => {
    if (!content.trim() || !provider || isSending) return;
    sendMessage(provider, content);
    setContent('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (keys.length === 0) {
    return (
      <div className="p-4 border-t border-border bg-card">
        <div className="max-w-3xl mx-auto text-center p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Bạn cần thêm API Key để sử dụng AI.</p>
          <Link to="/api-keys" className="text-sm font-medium text-primary hover:underline">
            Đến trang quản lý API Keys
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-background border border-border focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 rounded-xl shadow-sm p-2 transition-all">
        
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="h-10 text-xs sm:text-sm bg-muted/50 border-0 rounded-lg focus:ring-0 cursor-pointer font-medium text-muted-foreground hover:text-foreground transition-colors"
          title="Chọn mô hình AI"
        >
          {keys.map((k) => (
            <option key={k.id} value={k.provider}>
              {k.provider}
            </option>
          ))}
        </select>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi về ý tưởng khởi nghiệp của bạn..."
          className="flex-1 max-h-48 min-h-[40px] resize-none bg-transparent border-0 focus:ring-0 p-2 text-sm sm:text-base scrollbar-thin"
          rows={1}
          style={{ height: 'auto' }}
        />

        <button
          onClick={handleSend}
          disabled={!content.trim() || isSending}
          className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
        >
          {isSending ? (
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <SendHorizonal className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="max-w-3xl mx-auto text-center mt-2">
        <span className="text-[10px] text-muted-foreground/70">
          AI có thể mắc lỗi. Vui lòng kiểm tra lại các thông tin quan trọng.
        </span>
      </div>
    </div>
  );
};
