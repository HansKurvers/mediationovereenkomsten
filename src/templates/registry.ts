// ============================================
// FILE: src/templates/registry.ts
// Template registry - central registration of all templates
// ============================================

import { TemplateConfig } from '../types/template.types';
import { mfnConfig } from './mfn/config';
import { MfnPreview } from './mfn/preview';
import { adrConfig } from './adr/config';
import { AdrPreview } from './adr/preview';
import { vfasConfig } from './vfas/config';
import { VfasPreview } from './vfas/preview';

export interface RegisteredTemplate {
  config: TemplateConfig;
  PreviewComponent: React.FC<{ data: any }>;
}

export const templateRegistry: Record<string, RegisteredTemplate> = {
  mfn: {
    config: mfnConfig,
    PreviewComponent: MfnPreview,
  },
  adr: {
    config: adrConfig,
    PreviewComponent: AdrPreview,
  },
  vfas: {
    config: vfasConfig,
    PreviewComponent: VfasPreview,
  },
};

export const getTemplate = (templateId: string): RegisteredTemplate | undefined => {
  return templateRegistry[templateId];
};

export const getAllTemplates = (): RegisteredTemplate[] => {
  return Object.values(templateRegistry);
};
