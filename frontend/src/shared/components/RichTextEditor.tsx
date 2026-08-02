import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  Strikethrough,
  Heading1, 
  Heading2, 
  Heading3,
  List, 
  ListOrdered, 
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
  RemoveFormatting,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  editable?: boolean;
}

/** Reusable toolbar button */
const ToolbarButton: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  label: string;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, isActive, label, title, children }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`p-1.5 rounded-lg transition-all duration-150 ${
      isActive 
        ? 'bg-sky-500 text-white shadow-sm shadow-sky-200 dark:shadow-sky-900' 
        : 'hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400'
    }`}
    title={title}
  >
    {children}
  </button>
);

/** Toolbar separator */
const Divider = () => <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-0.5" />;

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange, 
  editable = true 
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-sky-100 dark:border-sky-900/40 rounded-xl overflow-hidden bg-white dark:bg-slate-900 flex flex-col w-full shadow-sm">
      {editable && (
        <div className="flex flex-wrap items-center gap-0.5 px-2.5 py-2 border-b border-sky-100 dark:border-sky-900/40 bg-gradient-to-r from-sky-50/80 to-white dark:from-slate-800/60 dark:to-slate-900">
          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            label="bold"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            label="italic"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            label="strikethrough"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            label="inline code"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          {/* Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            label="heading 1"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            label="heading 2"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            label="heading 3"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          {/* Lists & Block */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            label="bullet list"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            label="ordered list"
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            label="blockquote"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            label="horizontal rule"
            title="Horizontal Rule"
          >
            <Minus className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          {/* Undo / Redo / Clear */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            label="undo"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            label="redo"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            label="clear formatting"
            title="Xóa định dạng"
          >
            <RemoveFormatting className="w-4 h-4" />
          </ToolbarButton>
        </div>
      )}

      <div className="p-5 prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[250px] prose-headings:text-sky-900 dark:prose-headings:text-sky-100 prose-a:text-sky-600">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
