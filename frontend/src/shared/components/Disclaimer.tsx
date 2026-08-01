import { AlertTriangle } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md mt-2 border border-border/50">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
      <p>
        <strong>Lưu ý:</strong> AI Startup Coach có thể cung cấp thông tin không chính xác. 
        Hãy luôn kiểm chứng độc lập các lời khuyên về tài chính, pháp lý và chiến lược kinh doanh.
      </p>
    </div>
  );
};
