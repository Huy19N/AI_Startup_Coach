import React from 'react';
import { Lightbulb } from 'lucide-react';

interface IdeaSummaryBoxProps {
  summary?: string | null;
}

export const IdeaSummaryBox: React.FC<IdeaSummaryBoxProps> = ({ summary }) => {
  if (!summary) {
    return (
      <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-muted-foreground text-xs italic text-center">
        Chưa có tóm tắt ý tưởng. Hãy tiếp tục trò chuyện với AI để làm rõ ý tưởng của bạn!
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-foreground transition-all">
      <div className="flex items-center gap-2 mb-1 text-amber-500 font-medium text-xs uppercase tracking-wider">
        <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
        <span>Tóm tắt ý tưởng</span>
      </div>
      <p className="text-sm font-medium leading-relaxed pl-6">
        {summary}
      </p>
    </div>
  );
};
