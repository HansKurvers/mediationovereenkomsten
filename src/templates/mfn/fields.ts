// ============================================
// FILE: src/templates/mfn/fields.ts
// MfN-specific field definitions
// ============================================

import { TemplateField } from '../../types/template.types';

export const mfnFields = {
  // MfN-specifiek: registratienummer
  mediatorMfnRegistratie: {
    id: 'mediatorMfnRegistratie',
    label: 'MfN registratienummer (optioneel)',
    type: 'text',
    placeholder: 'MfN-12345',
    required: false,
    helpText: 'Registratienummer bij Mediatorsfederatie Nederland'
  } as TemplateField,

  // Activiteiten die onder uurtarief vallen
  activiteitenOnderUurtarief: {
    id: 'activiteitenOnderUurtarief',
    label: 'Activiteiten die onder het uurtarief vallen',
    type: 'textarea',
    placeholder: 'Bijv: begeleiden mediationproces, contacten met partijen, bestuderen van stukken...',
    required: false,
    helpText: 'Specificeer welke werkzaamheden onder het uurtarief vallen'
  } as TemplateField,

  // Gedragsregels bijlage
  gedragsregelsBijgevoegd: {
    id: 'gedragsregelsBijgevoegd',
    label: 'MfN-Gedragsregels bijgevoegd',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'Partijen verklaren een exemplaar van de MfN-Gedragsregels te hebben ontvangen'
  } as TemplateField,

  // Reglement bijgevoegd
  reglementBijgevoegd: {
    id: 'reglementBijgevoegd',
    label: 'MfN-Mediationreglement bijgevoegd',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'Een kopie van het MfN-Mediationreglement is gehecht aan deze overeenkomst'
  } as TemplateField,
};
