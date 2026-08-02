import React, { useEffect, useState } from 'react';
import { PromptTemplate } from '../types/admin.types';
import { templateAdminService } from '../services/templateAdminService';
import { Shield, Plus, Edit2, CheckCircle, XCircle, Loader2, Sparkles } from 'lucide-react';
import { TemplateEditModal } from './TemplateEditModal';

export const AdminTemplatePage: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchTemplates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await templateAdminService.getAll();
      setTemplates(data);
    } catch (err: any) {
      console.error('Lỗi tải danh sách template:', err);
      setError('Không thể tải danh sách prompt templates.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleOpenEdit = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    fetchTemplates();
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 w-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sky-100 dark:border-sky-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-1">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Admin Portal</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Quản lý System Prompts
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Cấu hình prompt hướng dẫn AI khởi tạo nội dung cho từng loại tài liệu startup.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm shadow-md shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Prompt Template</span>
        </button>
      </div>

      {/* Loading & Error states */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          <p className="text-sm">Đang tải danh sách System Prompts...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      ) : templates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <Sparkles className="w-10 h-10 mx-auto text-sky-400" />
          <h3 className="font-semibold text-slate-700 dark:text-slate-300">Chưa có Prompt Template nào</h3>
          <p className="text-xs text-slate-500">Bấm nút "Thêm Prompt Template" để bắt đầu tạo mới.</p>
        </div>
      ) : (
        /* Template List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-bold font-mono border border-sky-200/50">
                    {tpl.documentType}
                  </span>

                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      tpl.isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {tpl.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{tpl.isActive ? 'Active' : 'Inactive'}</span>
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono max-h-28 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {tpl.systemPrompt}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-400">
                <span>Khởi tạo: {new Date(tpl.createdAt).toLocaleDateString('vi-VN')}</span>

                <button
                  onClick={() => handleOpenEdit(tpl)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 font-semibold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <TemplateEditModal
          template={selectedTemplate}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSaveSuccess}
        />
      )}
    </div>
    </div>
  );
};
