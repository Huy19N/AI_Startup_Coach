import { render, screen, fireEvent, act } from '@testing-library/react';
import { DocumentFeedback } from '../DocumentFeedback';
import { documentService } from '../../services/documentService';

jest.mock('../../services/documentService');

describe('DocumentFeedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders rating prompt and like/dislike buttons', () => {
    render(<DocumentFeedback documentId={1} />);

    expect(screen.getByText('Đánh giá chất lượng tài liệu này')).toBeInTheDocument();
    expect(screen.getByTitle('Hữu ích (Like)')).toBeInTheDocument();
    expect(screen.getByTitle('Chưa hài lòng (Dislike)')).toBeInTheDocument();
  });

  test('clicking like triggers provideFeedback API call', async () => {
    (documentService.provideFeedback as jest.Mock).mockResolvedValue({});

    render(<DocumentFeedback documentId={1} />);

    const likeButton = screen.getByTitle('Hữu ích (Like)');
    await act(async () => {
      fireEvent.click(likeButton);
    });

    expect(documentService.provideFeedback).toHaveBeenCalledWith(1, true, '');
  });
});
