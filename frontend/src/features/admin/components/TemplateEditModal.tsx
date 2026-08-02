import React, { useState } from 'react';
import { PromptTemplate } from '../types/admin.types';
import { templateAdminService } from '../services/templateAdminService';
import { X, Save, Loader2, Sparkles } from 'lucide-react';

interface TemplateEditModalProps {
  template: PromptTemplate | null;
  onClose: () => void;
  onSuccess: () => void;
}

const DOCUMENT_TYPES = [
  'General',
  'LeanCanvas',
  'SWOT',
  'BMC',
  'MVPPlan',
  'MarketingStrategy',
  'PitchOutline',
  'FundraisingGuide',
];

export const TemplateEditModal: React.FC<TemplateEditModalProps> = ({
  template,
  onClose,
  onSuccess,
}) => {
  const isEditing = !!template;
  const [documentType, setDocumentType] = useState<string>(template?.documentType || 'General');
  const [systemPrompt, setSystemPrompt] = useState<string>(template?.systemPrompt || '');
  const [isActive, setIsActive] = useState<boolean>(template ? template.isActive : true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!systemPrompt.trim()) {
      setError('Vui lòng nhập nội dung System Prompt.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing && template) {
        await templateAdminService.update(template.id, {
          documentType,
          systemPrompt,
          isActive,
        });
      } else {
        await templateAdminService.create({
          documentType,
          systemPrompt,
          isActive,
        });
      }
      onSuccess();
    } catch (err: any) {
      console.error('Lỗi khi lưu template:', err);
      setError(err.response?.data?.message || 'Không thể lưu template. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-sky-100 dark:border-sky-900/40 flex items-center justify-between bg-sky-50/50 dark:bg-sky-950/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">
              {isEditing ? `Chỉnh sửa Prompt (${template?.documentType})` : 'Thêm System Prompt Template mới'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Document Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Loại tài liệu (Document Type)
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* System Prompt Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nội dung System Prompt
            </label>
            <textarea
              rows={10}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Nhập hướng dẫn System Prompt cho AI tại đây..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
            />
          </div>

          {/* IsActive Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Trạng thái kích hoạt (Active)</span>
              <span className="text-[11px] text-slate-400">Nếu Active, AI Service sẽ ưu tiên dùng prompt này từ DB.</span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
