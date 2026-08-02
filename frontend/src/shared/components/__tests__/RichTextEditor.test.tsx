import { render, screen } from '@testing-library/react';
import { RichTextEditor } from '../RichTextEditor';

describe('RichTextEditor', () => {
  it('renders editor toolbar with all formatting buttons', () => {
    const initialContent = '<h1>Test Heading</h1><p>Test paragraph</p>';
    render(<RichTextEditor content={initialContent} onChange={jest.fn()} />);

    // Text formatting
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /strikethrough/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /inline code/i })).toBeInTheDocument();

    // Headings
    expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /heading 3/i })).toBeInTheDocument();

    // Lists & Block
    expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ordered list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /blockquote/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /horizontal rule/i })).toBeInTheDocument();

    // Undo/Redo/Clear
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /redo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear formatting/i })).toBeInTheDocument();
  });

  it('hides toolbar when editable is false', () => {
    render(<RichTextEditor content="<p>Read-only</p>" onChange={jest.fn()} editable={false} />);

    expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
  });
});
