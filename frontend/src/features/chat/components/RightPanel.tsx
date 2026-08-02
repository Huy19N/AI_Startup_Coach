import React from 'react';
import { IdeaSummaryBox } from './IdeaSummaryBox';
import { DocumentViewer } from './DocumentViewer';
import { useChatStore } from '../stores/chatStore';

export const RightPanel: React.FC = () => {
  const { currentSession, documents } = useChatStore();

  return (
    <div className="w-80 lg:w-96 border-l border-border/60 bg-muted/20 flex flex-col h-full overflow-y-auto p-4 gap-6 shrink-0">
      <IdeaSummaryBox summary={currentSession?.ideaSummary} />
      <DocumentViewer documents={documents} />
    </div>
  );
};
