
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentViewer } from '../DocumentViewer';
import { DocumentItem } from '../../types/chat.types';

// Mock ReactMarkdown since it can have issues in JSDOM without proper config
jest.mock('react-markdown', () => (props: { children: string }) => <div>{props.children}</div>);
jest.mock('@/shared/components/Disclaimer', () => ({
  Disclaimer: () => <div data-testid="disclaimer">Disclaimer Mock</div>
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
    
    // Check if original ones work
    expect(screen.getByText('Lean Canvas')).toBeInTheDocument(); // Assuming we map it to "Lean Canvas" instead of "LeanCanvas"
    expect(screen.getByText('Mô hình Kinh doanh (BMC)')).toBeInTheDocument(); // Assuming BMC maps to this
    expect(screen.getByText('Kế hoạch MVP')).toBeInTheDocument(); // Assuming MVPPlan maps to this
  });

  it('opens modal on document click and shows disclaimer', () => {
    render(<DocumentViewer documents={mockDocuments} />);
    
    // Click on BMC document
    const bmcItem = screen.getByText('Mô hình Kinh doanh (BMC)');
    fireEvent.click(bmcItem);
    
    // Check if modal opens with content
    expect(screen.getByText('BMC Content')).toBeInTheDocument();
    
    // Check if disclaimer is rendered
    expect(screen.getByTestId('disclaimer')).toBeInTheDocument();
  });
});
