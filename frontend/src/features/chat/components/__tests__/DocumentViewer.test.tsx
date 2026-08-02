import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentViewer } from '../DocumentViewer';
import { DocumentItem } from '../../types/chat.types';

jest.mock('@/shared/components/Disclaimer', () => ({
  Disclaimer: () => <div data-testid="disclaimer">Disclaimer Mock</div>
}));

jest.mock('@/shared/components/RichTextEditor', () => ({
  RichTextEditor: ({ content }: { content: string }) => <div data-testid="rich-text-editor">{content}</div>
}));

jest.mock('../../services/documentService', () => ({
  documentService: {
    createVersion: jest.fn(),
    getVersions: jest.fn().mockResolvedValue([]),
  }
}));

jest.mock('marked', () => ({
  marked: {
    parse: (content: string) => content
  }
}));

describe('DocumentViewer', () => {
  const mockDocuments: DocumentItem[] = [
    { id: 1, chatSessionId: 1, type: 'LeanCanvas', content: 'Lean Canvas Content', createdAt: '2026-08-01T00:00:00Z' },
    { id: 2, chatSessionId: 1, type: 'BMC', content: 'BMC Content', createdAt: '2026-08-01T00:00:00Z' },
    { id: 3, chatSessionId: 1, type: 'MVPPlan', content: 'MVP Plan Content', createdAt: '2026-08-01T00:00:00Z' }
  ];

  it('renders correctly with empty list', () => {
    render(<DocumentViewer documents={[]} />);
    expect(screen.getByText(/Chưa có tài liệu nào/i)).toBeInTheDocument();
  });

  it('renders document list with correct labels', () => {
    render(<DocumentViewer documents={mockDocuments} />);
    
    expect(screen.getByText('Lean Canvas')).toBeInTheDocument();
    expect(screen.getByText('Mô hình Kinh doanh (BMC)')).toBeInTheDocument();
    expect(screen.getByText('Kế hoạch MVP')).toBeInTheDocument();
  });

  it('opens modal on document click and shows disclaimer', () => {
    render(<DocumentViewer documents={mockDocuments} />);
    
    const bmcItem = screen.getByText('Mô hình Kinh doanh (BMC)');
    fireEvent.click(bmcItem);
    
    expect(screen.getByTestId('rich-text-editor')).toHaveTextContent('BMC Content');
    expect(screen.getByTestId('disclaimer')).toBeInTheDocument();
  });
});
