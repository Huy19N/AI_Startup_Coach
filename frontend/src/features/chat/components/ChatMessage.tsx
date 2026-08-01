import { Bot, User as UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types/chat.types';
import { Disclaimer } from '@/shared/components/Disclaimer';
import { useAuthStore } from '@/features/auth/stores/authStore';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAI = message.role === 'AI';
  const { user } = useAuthStore();

  return (
    <div className={`py-6 px-4 sm:px-6 w-full ${isAI ? 'bg-muted/30 border-y border-border/50' : ''}`}>
      <div className="max-w-3xl mx-auto flex gap-4 sm:gap-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isAI ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
        }`}>
          {isAI ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1 text-foreground/80">
            {isAI ? 'AI Startup Coach' : (user?.fullName || 'Bạn')}
          </div>
          
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border">
            {isAI ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>
          
          {isAI && <Disclaimer />}
        </div>
      </div>
    </div>
  );
};
