import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send, Loader2, User } from 'lucide-react';
import { documentService } from '../services/documentService';

interface CommentItem {
  id: number;
  documentId: number;
  userId: string;
  userName?: string;
  userRole?: string;
  content: string;
  createdAt: string;
}

interface CommentDrawerProps {
  documentId: number;
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({ documentId }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await documentService.getComments(documentId);
      setComments(data);
    } catch (err) {
      console.error('Lỗi tải comment:', err);
      setError('Không thể tải nhận xét.');
    } finally {
      setIsLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSending(true);
    try {
      const created = await documentService.createComment(documentId, newComment.trim());
      setComments((prev) => [...prev, created]);
      setNewComment('');
    } catch (err) {
      console.error('Lỗi gửi comment:', err);
      alert('Không thể gửi nhận xét.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-80 border-l border-sky-100 dark:border-sky-900/40 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col h-full animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-sky-100 dark:border-sky-900/30 flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
        <MessageSquare className="w-4 h-4 text-sky-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
          Nhận xét & Review ({comments.length})
        </h4>
      </div>

      {/* Comment List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-6 text-slate-400 space-y-2">
            <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
            <span className="text-xs">Đang tải nhận xét...</span>
          </div>
        ) : error ? (
          <p className="text-xs text-rose-500 text-center py-4">{error}</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 space-y-2 text-slate-400">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="text-xs">Chưa có nhận xét nào từ Mentor hay Sinh viên.</p>
          </div>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {item.userName || 'User'}
                  </span>
                  {item.userRole && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-300 font-medium">
                      {item.userRole}
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-slate-400">
                  {new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendComment} className="p-3 border-t border-sky-100 dark:border-sky-900/40 bg-white dark:bg-slate-900 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết nhận xét của bạn..."
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          disabled={isSending || !newComment.trim()}
          className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-colors disabled:opacity-50"
          title="Gửi nhận xét"
        >
          {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};
