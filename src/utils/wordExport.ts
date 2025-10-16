// ============================================
// FILE: src/utils/wordExport.ts
// Word export utility with improved formatting
// ============================================

import { getTemplate } from '../templates/registry';

export const exportToWord = async (
  templateId: string,
  _formData: any,
  templateName: string
): Promise<void> => {
  const template = getTemplate(templateId);
  if (!template) {
    throw new Error('Template not found');
  }

  // Get the preview content
  const previewElement = document.getElementById('preview-content');
  if (!previewElement) {
    throw new Error('Preview content not found');
  }

  // Clone the content to avoid modifying the original
  const clonedContent = previewElement.cloneNode(true) as HTMLElement;

  // Convert the HTML to a Word-compatible format with improved styling
  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${templateName} - Mediationovereenkomst</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        /* Page Setup */
        @page {
          size: A4;
          margin: 2.54cm 2.54cm 2.54cm 2.54cm;
        }

        /* Body */
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.6;
          color: #000000;
        }

        /* Headings */
        h1 {
          font-size: 18pt;
          font-weight: bold;
          text-align: center;
          margin-top: 0;
          margin-bottom: 24pt;
        }

        h2 {
          font-size: 14pt;
          font-weight: bold;
          margin-top: 18pt;
          margin-bottom: 12pt;
        }

        /* Paragraphs */
        p {
          margin-top: 0;
          margin-bottom: 12pt;
          text-align: justify;
        }

        /* Strong/Bold */
        strong, b {
          font-weight: bold;
        }

        /* Indentation for articles */
        .article-content {
          margin-left: 20pt;
        }

        /* Sub-articles with flex layout */
        .sub-article {
          display: table;
          width: 100%;
          margin-bottom: 12pt;
        }

        .sub-article-number {
          display: table-cell;
          width: 40pt;
          font-weight: bold;
          vertical-align: top;
        }

        .sub-article-text {
          display: table-cell;
          vertical-align: top;
        }

        /* Signature section */
        .signature-section {
          margin-top: 48pt;
          page-break-inside: avoid;
        }

        .signature-container {
          display: table;
          width: 100%;
          margin-top: 48pt;
        }

        .signature-column {
          display: table-cell;
          width: 33%;
          vertical-align: top;
          padding-right: 10pt;
        }

        .signature-line {
          border-top: 1pt solid black;
          padding-top: 8pt;
          margin-top: 60pt;
          font-size: 10pt;
        }

        .signature-label {
          font-weight: bold;
          margin-bottom: 8pt;
        }

        .signature-representative {
          font-size: 9pt;
          font-style: italic;
          margin-bottom: 8pt;
        }

        /* Prevent page breaks in important sections */
        .no-break {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      ${clonedContent.innerHTML}
    </body>
    </html>
  `;

  // Create a Blob from the HTML
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  // Generate filename with date
  const date = new Date().toISOString().split('T')[0];
  const fileName = `Mediationovereenkomst_${templateName}_${date}.doc`;
  link.download = fileName;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
