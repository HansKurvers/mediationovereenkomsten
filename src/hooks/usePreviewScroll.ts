// ============================================
// FILE: src/hooks/usePreviewScroll.ts
// Auto-scroll preview to focused field with highlight effect
// Improved stability and spam prevention
// ============================================

import { useEffect, useRef } from 'react';

export const usePreviewScroll = (fieldId: string, value: any, isFocused: boolean) => {
  const timeoutRef = useRef<number | undefined>(undefined);
  const lastScrolledFieldRef = useRef<string>('');
  const isScrollingRef = useRef(false);

  useEffect(() => {
    // Alleen scrollen bij focus
    if (!isFocused) return;

    // Voorkom scroll spam
    if (isScrollingRef.current) return;

    // Voorkom dubbele scroll naar hetzelfde veld kort na elkaar
    if (lastScrolledFieldRef.current === fieldId) return;

    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = true;

      const previewElement = document.querySelector(`[data-field="${fieldId}"]`);

      if (previewElement) {
        const previewContainer = document.querySelector('.preview-container');

        if (previewContainer) {
          const containerRect = previewContainer.getBoundingClientRect();
          const elementRect = previewElement.getBoundingClientRect();
          const scrollTop = previewContainer.scrollTop;

          // Check of element al redelijk in zicht is (met marge)
          const isInView = (
            elementRect.top >= containerRect.top + 50 &&
            elementRect.bottom <= containerRect.bottom - 50
          );

          // Alleen scrollen als element niet goed in zicht is
          if (!isInView) {
            const offset = elementRect.top - containerRect.top + scrollTop - 150;

            previewContainer.scrollTo({
              top: Math.max(0, offset),
              behavior: 'smooth'
            });
          }

          // Highlight effect
          previewElement.classList.add('highlight-field');
          setTimeout(() => {
            previewElement.classList.remove('highlight-field');
            isScrollingRef.current = false;
          }, 1000);

          lastScrolledFieldRef.current = fieldId;
        } else {
          isScrollingRef.current = false;
        }
      } else {
        isScrollingRef.current = false;
      }
    }, 150); // Snelle response bij focus

    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fieldId, isFocused]);

  // Reset na blur met delay
  useEffect(() => {
    if (!isFocused) {
      const resetTimeout = window.setTimeout(() => {
        lastScrolledFieldRef.current = '';
      }, 1000);

      return () => clearTimeout(resetTimeout);
    }
  }, [isFocused]);
};
