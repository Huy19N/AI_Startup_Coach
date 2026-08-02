import { saveAs } from 'file-saver';

/**
 * Export HTML content as a .docx Word document (client-side).
 * Uses dynamic import for html-to-docx to reduce initial bundle size.
 */
export async function exportHtmlToDocx(title: string, htmlContent: string) {
  try {
    const HTMLtoDOCX = (await import('html-to-docx')).default;
    
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

/**
 * Export HTML content as a .pdf document (client-side).
 * Uses html2pdf.js with jsPDF + html2canvas under the hood.
 */
export async function exportHtmlToPdf(title: string, htmlContent: string) {
  try {
    const html2pdf = (await import('html2pdf.js')).default;

    // Create a temporary container with print-friendly styles
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.padding = '24px';
    container.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
    container.style.fontSize = '14px';
    container.style.lineHeight = '1.6';
    container.style.color = '#1e293b';

    const filename = `${title.replace(/\s+/g, '_')}.pdf`;

    await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      } as Record<string, unknown>)
      .from(container)
      .save();
  } catch (error) {
    console.error('Lỗi khi xuất file PDF:', error);
    alert('Không thể xuất file PDF. Vui lòng thử lại.');
  }
}
