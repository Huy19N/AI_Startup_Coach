import React, { useState, useEffect, useRef } from 'react';
import { DocumentItem, DocumentVersionItem } from '../types/chat.types';
import { 
  FileText, 
  Eye, 
  X, 
  Layers, 
  Activity, 
  Grid, 
  Rocket, 
  Target, 
  Presentation, 
  DollarSign,
  Save,
  Download,
  History,
  Printer,
  Loader2,
  Check,
  MessageSquare,
} from 'lucide-react';
import { Disclaimer } from '@/shared/components/Disclaimer';
import { RichTextEditor } from '@/shared/components/RichTextEditor';
import { documentService } from '../services/documentService';
import { exportHtmlToDocx, exportHtmlToPdf } from '../utils/exportUtils';
import { DocumentFeedback } from './DocumentFeedback';
import { CommentDrawer } from './CommentDrawer';
import { marked } from 'marked';

interface DocumentViewerProps {
  documents: DocumentItem[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [versions, setVersions] = useState<DocumentVersionItem[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isLoadingVersions, setIsLoadingVersions] = useState<boolean>(false);
  
  const printRef = useRef<HTMLDivElement>(null);

  // Synchronize editor content when selected document changes
  useEffect(() => {
    if (selectedDoc) {
      // Convert markdown to HTML if needed
      let html = selectedDoc.content;
      if (!html.trim().startsWith('<')) {
        html = marked.parse(selectedDoc.content) as string;
      }
      setEditorContent(html);
      setShowHistory(false);
      setShowComments(false);
    }
  }, [selectedDoc]);

  const handleOpenDoc = (doc: DocumentItem) => {
    setSelectedDoc(doc);
  };

  const handleSaveVersion = async () => {
    if (!selectedDoc) return;
    setIsSaving(true);
    try {
      await documentService.createVersion(selectedDoc.id, editorContent);
      selectedDoc.content = editorContent; // Update local ref
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      if (showHistory) {
        fetchVersions();
      }
    } catch (err) {
      console.error('Lỗi khi lưu phiên bản mới:', err);
      alert('Không thể lưu phiên bản mới.');
    } finally {
      setIsSaving(false);
    }
  };

  const fetchVersions = async () => {
    if (!selectedDoc) return;
    setIsLoadingVersions(true);
    try {
      const data = await documentService.getVersions(selectedDoc.id);
      setVersions(data);
    } catch (err) {
      console.error('Lỗi khi tải lịch sử:', err);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      fetchVersions();
    }
    setShowHistory(!showHistory);
  };

  const handleSelectVersion = (version: DocumentVersionItem) => {
    let html = version.content;
    if (!html.trim().startsWith('<')) {
      html = marked.parse(version.content) as string;
    }
    setEditorContent(html);
  };

  const handlePrintPdf = () => {
    if (!selectedDoc) return;
    exportHtmlToPdf(getDocLabel(selectedDoc.type), editorContent);
  };

  const handleExportDocx = () => {
    if (!selectedDoc) return;
    exportHtmlToDocx(getDocLabel(selectedDoc.type), editorContent);
  };

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
              onClick={() => handleOpenDoc(doc)}
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

      {/* Modal Editor / Full View */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {getDocIcon(selectedDoc.type)}
                <h3 className="font-semibold text-lg">{getDocLabel(selectedDoc.type)}</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Save Button */}
                <button
                  onClick={handleSaveVersion}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                  title="Lưu phiên bản mới"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : saveSuccess ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>{saveSuccess ? 'Đã lưu!' : 'Lưu bản mới'}</span>
                </button>

                {/* Export Buttons */}
                <button
                  onClick={handleExportDocx}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  title="Xuất Word (.docx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Word</span>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  title="In / Xuất PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>

                {/* Toggle Comments */}
                <button
                  onClick={() => {
                    setShowComments(!showComments);
                    if (!showComments) setShowHistory(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    showComments 
                      ? 'bg-sky-100 border-sky-300 text-sky-700 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-300' 
                      : 'border-border hover:bg-muted text-muted-foreground'
                  }`}
                  title="Nhận xét & Review"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Nhận xét</span>
                </button>

                {/* Toggle History */}
                <button
                  onClick={() => {
                    toggleHistory();
                    if (!showHistory) setShowComments(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    showHistory 
                      ? 'bg-accent border-accent text-accent-foreground' 
                      : 'border-border hover:bg-muted text-muted-foreground'
                  }`}
                  title="Lịch sử phiên bản"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Lịch sử</span>
                </button>

                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Area + Drawers */}
            <div className="flex-1 overflow-hidden flex relative">
              <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={printRef}>
                <RichTextEditor
                  content={editorContent}
                  onChange={(html) => setEditorContent(html)}
                />

                {/* Document Feedback Section */}
                <div className="pt-4 border-t border-sky-100 dark:border-sky-900/30">
                  <DocumentFeedback documentId={selectedDoc.id} />
                </div>
              </div>

              {/* Comments Drawer */}
              {showComments && <CommentDrawer documentId={selectedDoc.id} />}

              {/* History Drawer */}
              {showHistory && (
                <div className="w-64 border-l border-border bg-muted/20 flex flex-col p-4 space-y-3 overflow-y-auto animate-in slide-in-from-right duration-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    <span>Lịch sử phiên bản</span>
                  </h4>

                  {isLoadingVersions ? (
                    <div className="flex items-center justify-center p-6 text-muted-foreground">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  ) : versions.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Chưa có bản lưu nào trước đó.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {versions.map((ver, idx) => (
                        <div
                          key={ver.id}
                          onClick={() => handleSelectVersion(ver)}
                          className="p-2.5 rounded-lg bg-card hover:bg-accent border border-border/50 text-xs transition-colors cursor-pointer"
                        >
                          <div className="font-medium text-foreground mb-0.5">
                            Phiên bản #{versions.length - idx}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {new Date(ver.createdAt).toLocaleString('vi-VN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
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
