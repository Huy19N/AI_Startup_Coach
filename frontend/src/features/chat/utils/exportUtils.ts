import { saveAs } from 'file-saver';

export async function exportHtmlToDocx(title: string, htmlContent: string) {
  try {
    // Dynamic import to handle SSR or bundle optimization
    const HTMLtoDOCX = (await import('html-to-docx')).default;
    
    // Wrap in standard HTML structure
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const docxBlob = await HTMLtoDOCX(fullHtml, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    saveAs(docxBlob, `${title.replace(/\s+/g, '_')}.docx`);
  } catch (error) {
    console.error('Lỗi khi xuất file DOCX:', error);
    alert('Không thể xuất file DOCX. Vui lòng thử lại.');
  }
}
