import React, { useState } from 'react';
import { DocumentItem } from '../types/chat.types';
import { FileText, Eye, X, Layers, Activity, Grid, Rocket, Target, Presentation, DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Disclaimer } from '@/shared/components/Disclaimer';

interface DocumentViewerProps {
  documents: DocumentItem[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const getDocIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'leancanvas':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'swot':
        return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'bmc':
        return <Grid className="w-4 h-4 text-purple-500" />;
      case 'mvpplan':
        return <Rocket className="w-4 h-4 text-orange-500" />;
      case 'marketingstrategy':
        return <Target className="w-4 h-4 text-red-500" />;
      case 'pitchoutline':
        return <Presentation className="w-4 h-4 text-indigo-500" />;
      case 'fundraisingguide':
        return <DollarSign className="w-4 h-4 text-green-600" />;
      default:
        return <FileText className="w-4 h-4 text-primary" />;
    }
  };

  const getDocLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'leancanvas': return 'Lean Canvas';
      case 'swot': return 'Phân tích SWOT';
      case 'bmc': return 'Mô hình Kinh doanh (BMC)';
      case 'mvpplan': return 'Kế hoạch MVP';
      case 'marketingstrategy': return 'Chiến lược Marketing';
      case 'pitchoutline': return 'Dàn ý Pitching';
      case 'fundraisingguide': return 'Cẩm nang Gọi vốn';
      default: return type;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span>Tài liệu khởi nghiệp ({documents.length})</span>
        </h3>
      </div>

      {documents.length === 0 ? (
        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-muted-foreground text-xs text-center">
          Chưa có tài liệu nào. Bạn có thể nhờ AI: <br />
          <span className="font-mono text-[11px] text-primary/80">"Tạo Lean Canvas cho tôi"</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="group p-3 rounded-xl bg-card hover:bg-accent/50 border border-border/60 transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-background transition-colors">
                  {getDocIcon(doc.type)}
                </div>
                <div>
                  <h4 className="text-sm font-medium leading-none mb-1 group-hover:text-primary transition-colors">
                    {getDocLabel(doc.type)}
                  </h4>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(doc.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal View Full Document */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                {getDocIcon(selectedDoc.type)}
                <h3 className="font-semibold text-lg">{getDocLabel(selectedDoc.type)}</h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <article className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>
                  {selectedDoc.content}
                </ReactMarkdown>
              </article>
            </div>

            <div className="p-4 border-t border-border flex justify-between items-center bg-muted/20">
              <Disclaimer />
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
