// ============================================
// FILE: src/components/Footer.tsx
// Privacy footer component
// ============================================

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        padding: '24px 0',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        {/* Main content */}
        <div style={{ marginBottom: '12px' }}>
          <p
            style={{
              fontSize: '14px',
              color: '#374151',
              marginBottom: '8px',
              fontWeight: '500',
            }}
          >
            Mediationdesk Breda
          </p>
          <a
            href="https://www.mediationdesk.nl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              color: '#2563eb',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#2563eb')}
          >
            www.mediationdesk.nl
          </a>
        </div>

        {/* Privacy statement with tooltip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              color: '#059669',
              fontWeight: '500',
            }}
          >
            ✓ Geen data wordt opgeslagen - AVG-compliant
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '1px solid #6b7280',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'help',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6b7280';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  i
                </button>
              </TooltipTrigger>
              <TooltipContent
                style={{
                  maxWidth: '300px',
                  padding: '12px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                <p>
                  Deze applicatie slaat geen persoonlijke gegevens op. Alle informatie blijft in uw
                  browser en verdwijnt wanneer u de pagina sluit.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: 0,
          }}
        >
          © 2025 Mediationdesk Breda
        </p>
      </div>
    </footer>
  );
};
