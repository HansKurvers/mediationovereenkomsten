// ============================================
// FILE: src/components/TemplateSelector.tsx
// Template selector component
// ============================================

import React from 'react';
import { getAllTemplates } from '../templates/registry';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  const templates = getAllTemplates();

  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
        Selecteer Template
      </h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {templates.map((template) => {
          const isSelected = template.config.metadata.id === selectedTemplateId;
          return (
            <button
              key={template.config.metadata.id}
              onClick={() => onSelectTemplate(template.config.metadata.id)}
              style={{
                padding: '16px 24px',
                border: isSelected ? `3px solid ${template.config.metadata.color}` : '2px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: isSelected ? `${template.config.metadata.color}15` : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                minWidth: '200px',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = template.config.metadata.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                {template.config.metadata.name}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                {template.config.metadata.fullName}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                {template.config.metadata.description}
              </div>
              <div style={{ fontSize: '11px', color: '#d1d5db', marginTop: '8px' }}>
                v{template.config.metadata.version}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
