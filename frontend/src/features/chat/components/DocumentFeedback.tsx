import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Send, Check, Loader2 } from 'lucide-react';
import { documentService } from '../services/documentService';

interface DocumentFeedbackProps {
  documentId: number;
  initialIsLiked?: boolean | null;
  initialFeedbackText?: string | null;
}

export const DocumentFeedback: React.FC<DocumentFeedbackProps> = ({
  documentId,
  initialIsLiked = null,
  initialFeedbackText = '',
}) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(initialIsLiked);
  const [feedbackText, setFeedbackText] = useState<string>(initialFeedbackText || '');
  const [showInput, setShowInput] = useState<boolean>(initialIsLiked !== null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const handleVote = async (liked: boolean) => {
    const nextValue = isLiked === liked ? null : liked;
    setIsLiked(nextValue);
    setShowInput(nextValue !== null);

    if (nextValue !== null) {
      await submitFeedback(nextValue, feedbackText);
    }
  };

  const submitFeedback = async (likedStatus: boolean | null, text: string) => {
    setIsSubmitting(true);
    try {
      await documentService.provideFeedback(documentId, likedStatus, text);
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 2500);
    } catch (err) {
      console.error('Lỗi gửi feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(isLiked, feedbackText);
  };

  return (
    <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Đánh giá chất lượng tài liệu này
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote(true)}
            className={`p-2 rounded-xl border transition-all ${
              isLiked === true
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-emerald-600 hover:border-emerald-300'
            }`}
            title="Hữu ích (Like)"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleVote(false)}
            className={`p-2 rounded-xl border transition-all ${
              isLiked === false
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-rose-600 hover:border-rose-300'
            }`}
            title="Chưa hài lòng (Dislike)"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInput && (
        <form onSubmit={handleSubmitText} className="space-y-2 animate-in fade-in duration-200">
          <div className="relative">
            <textarea
              rows={2}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Góp ý chi tiết giúp AI cải thiện câu trả lời tốt hơn..."
              className="w-full p-2.5 text-xs rounded-xl border border-sky-200 dark:border-sky-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors disabled:opacity-50"
              title="Gửi nhận xét"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {submittedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Cảm ơn bạn đã gửi phản hồi!</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
