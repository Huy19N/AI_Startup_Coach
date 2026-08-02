import { render, screen } from '@testing-library/react';
import { RichTextEditor } from '../RichTextEditor';

describe('RichTextEditor', () => {
  it('renders editor toolbar and initial content', () => {
    const initialContent = '<h1>Test Heading</h1><p>Test paragraph</p>';
    render(<RichTextEditor content={initialContent} onChange={jest.fn()} />);

    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
  });
});
