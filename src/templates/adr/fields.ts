// ============================================
// FILE: src/templates/adr/fields.ts
// ADR-specific field definitions
// ============================================

import { TemplateField } from '../../types/template.types';

export const adrFields = {
  // ADR-specifiek: registratienummer
  mediatorAdrRegistratie: {
    id: 'mediatorAdrRegistratie',
    label: 'ADR registratienummer (optioneel)',
    type: 'text',
    placeholder: 'ADR-12345',
    required: false,
    helpText: 'Registratienummer bij ADR Instituut'
  } as TemplateField,

  // Mediator rollen
  mediatorRollen: {
    id: 'mediatorRollen',
    label: 'Rollen van de mediator',
    type: 'multiselect',
    options: [
      { value: 'mediator', label: 'Mediator' },
      { value: 'conflictcoach', label: 'Conflictcoach' },
      { value: 'negotiator', label: 'Negotiator' }
    ],
    defaultValue: ['mediator'],
    required: true,
    helpText: 'Selecteer alle rollen die de mediator vervult'
  } as TemplateField,

  // Subsidie mogelijk
  subsidieMogelijk: {
    id: 'subsidieMogelijk',
    label: 'Is subsidie/toevoeging van toepassing?',
    type: 'radio',
    options: [
      { value: 'ja', label: 'Ja' },
      { value: 'nee', label: 'Nee' }
    ],
    defaultValue: 'nee',
    required: true,
    helpText: 'Geef aan of er subsidie of een toevoeging van toepassing is'
  } as TemplateField,

  // Toevoegingsnummer (conditional)
  subsidieBijToevoeging: {
    id: 'subsidieBijToevoeging',
    label: 'Toevoegingsnummer',
    type: 'text',
    placeholder: 'Bijv: 2024-12345',
    required: false,
    conditional: {
      field: 'subsidieMogelijk',
      value: 'ja'
    },
    helpText: 'Vul het toevoegingsnummer in indien van toepassing'
  } as TemplateField,

  // Meldcode huiselijk geweld
  meldcodeHuiselijkGeweld: {
    id: 'meldcodeHuiselijkGeweld',
    label: 'Meldcode huiselijk geweld en kindermishandeling van toepassing',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'De mediator is gebonden aan de meldcode huiselijk geweld en kindermishandeling'
  } as TemplateField,

  // Opnameverbod
  opnameverbod: {
    id: 'opnameverbod',
    label: 'Verbod op audio/video opnames',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'Het maken van audio- en/of video-opnames is niet toegestaan'
  } as TemplateField,

  // ADR Reglement
  adrReglement: {
    id: 'adrReglement',
    label: 'ADR Reglement',
    type: 'select',
    options: [
      { value: 'PD.002', label: 'PD.002 - Mediationreglement' },
      { value: 'PD.003', label: 'PD.003 - Geschillenreglement' },
      { value: 'GNG.PD.007', label: 'GNG.PD.007 - Gecertificeerd Negotiator Geschillen' }
    ],
    defaultValue: 'PD.002',
    required: true,
    helpText: 'Selecteer het toepasselijke ADR reglement'
  } as TemplateField,

  // Conflictcoach tarief (conditional)
  conflictcoachTarief: {
    id: 'conflictcoachTarief',
    label: 'Tarief conflictcoaching (€ per uur)',
    type: 'number',
    placeholder: '150',
    required: false,
    conditional: {
      field: 'mediatorRollen',
      value: 'conflictcoach'
    },
    helpText: 'Tarief voor conflictcoaching werkzaamheden'
  } as TemplateField,

  // Negotiator tarief (conditional)
  negotiatorTarief: {
    id: 'negotiatorTarief',
    label: 'Tarief negotiation (€ per uur)',
    type: 'number',
    placeholder: '175',
    required: false,
    conditional: {
      field: 'mediatorRollen',
      value: 'negotiator'
    },
    helpText: 'Tarief voor negotiation werkzaamheden'
  } as TemplateField,
};
