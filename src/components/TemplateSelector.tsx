// ============================================
// FILE: src/components/TemplateSelector.tsx
// Template selector component with compact cards and info tooltips
// ============================================

import React from 'react';
import { Info } from 'lucide-react';
import { getAllTemplates } from '../templates/registry';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

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
                padding: '12px 16px',
                border: isSelected ? `3px solid ${template.config.metadata.color}` : '2px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: isSelected ? `${template.config.metadata.color}15` : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                minWidth: '180px',
                maxWidth: '220px',
                position: 'relative',
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
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ fontWeight: '600', fontSize: '15px', flex: 1 }}>
                  {template.config.metadata.name}
                </div>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'help',
                          marginLeft: '8px',
                        }}
                      >
                        <Info className="h-4 w-4" style={{ color: '#9ca3af' }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p style={{ fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
                        {template.config.metadata.fullName}
                      </p>
                      <p style={{ fontSize: '12px', marginBottom: '6px' }}>
                        {template.config.metadata.description}
                      </p>
                      {template.config.metadata.details && (
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
                          {template.config.metadata.details}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', lineHeight: '1.4' }}>
                {template.config.metadata.description}
              </div>
              <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '6px' }}>
                v{template.config.metadata.version} · {template.config.metadata.organization}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
