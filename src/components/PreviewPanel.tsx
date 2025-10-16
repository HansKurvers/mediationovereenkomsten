// ============================================
// FILE: src/components/PreviewPanel.tsx
// Preview panel component
// ============================================

import React from 'react';
import { getTemplate } from '../templates/registry';

interface PreviewPanelProps {
  templateId: string;
  formData: any;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ templateId, formData }) => {
  const template = getTemplate(templateId);

  if (!template) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
        Template niet gevonden
      </div>
    );
  }

  const PreviewComponent = template.PreviewComponent;

  return (
    <div
      id="preview-content"
      style={{
        backgroundColor: 'white',
        padding: '48px',
        minHeight: '100%',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      }}
    >
      <PreviewComponent data={formData} />
    </div>
  );
};
