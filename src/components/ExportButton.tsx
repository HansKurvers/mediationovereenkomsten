// ============================================
// FILE: src/components/ExportButton.tsx
// Export button component with Word export
// ============================================

import React, { useState } from 'react';
import { exportToWord } from '../utils/wordExport';

interface ExportButtonProps {
  templateId: string;
  formData: any;
  templateName: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ templateId, formData, templateName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToWord(templateId, formData, templateName);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export mislukt. Controleer de console voor details.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      style={{
        padding: '12px 24px',
        backgroundColor: isExporting ? '#9ca3af' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: isExporting ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => {
        if (!isExporting) {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isExporting) {
          e.currentTarget.style.backgroundColor = '#3b82f6';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
    >
      {isExporting ? 'Exporteren...' : '📄 Exporteer naar Word'}
    </button>
  );
};
