// ============================================
// FILE: src/templates/vfas/fields.ts
// vFAS-specific field definitions
// ============================================

import { TemplateField } from '../../types/template.types';

export const vfasFields = {
  // BELANGRIJK: Dit veld bepaalt de hele structuur van het document
  mediatorVfasType: {
    id: 'mediatorVfasType',
    label: 'Type mediator',
    type: 'radio',
    options: [
      { value: 'aspirant', label: 'Aspirant-lid (advocaat-mediator)' },
      { value: 'lid', label: 'vFAS-lid (advocaat-mediator)' },
      { value: 'familiemediator', label: 'vFAS-advocaat familiemediator' }
    ],
    defaultValue: 'lid',
    required: true,
    helpText: 'Dit bepaalt de titel, mediator beschrijving en kosten structuur van het hele document'
  } as TemplateField,

  // vFAS registratienummer
  mediatorVfasRegistratie: {
    id: 'mediatorVfasRegistratie',
    label: 'vFAS registratienummer (optioneel)',
    type: 'text',
    placeholder: 'vFAS-12345',
    required: false,
    helpText: 'Registratienummer bij vereniging FAS'
  } as TemplateField,

  // Kantoor vestiging
  mediatorKantoorVestiging: {
    id: 'mediatorKantoorVestiging',
    label: 'Kantoorvestiging',
    type: 'text',
    placeholder: 'Amsterdam',
    required: true,
    helpText: 'Plaats waar de mediator kantoor houdt'
  } as TemplateField,

  // Scheidingsmediation
  scheidingsmediation: {
    id: 'scheidingsmediation',
    label: 'Het betreft scheidingsmediation',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'Vinkt aan als het specifiek om scheidingsmediation gaat'
  } as TemplateField,

  // Ouderschapsplan nodig
  ouderschapsplanNodig: {
    id: 'ouderschapsplanNodig',
    label: 'Is er een ouderschapsplan nodig?',
    type: 'radio',
    options: [
      { value: 'ja', label: 'Ja' },
      { value: 'nee', label: 'Nee' }
    ],
    defaultValue: 'nee',
    required: true,
    helpText: 'Bij minderjarige kinderen is meestal een ouderschapsplan nodig'
  } as TemplateField,

  // Ouderschapsplan als bijlage
  ouderschapsplanBijlage: {
    id: 'ouderschapsplanBijlage',
    label: 'Ouderschapsplan wordt als bijlage toegevoegd',
    type: 'checkbox',
    defaultValue: false,
    conditional: {
      field: 'ouderschapsplanNodig',
      value: 'ja'
    },
    helpText: 'Het ouderschapsplan wordt als bijlage bij deze overeenkomst gevoegd'
  } as TemplateField,

  // Verschoningsrecht advocaat
  verschoningsrechtAdvocaat: {
    id: 'verschoningsrechtAdvocaat',
    label: 'Mediator heeft verschoningsrecht als advocaat',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'De mediator heeft als advocaat een wettelijk verschoningsrecht'
  } as TemplateField,

  // vFAS Gedragsregels
  vfasGedragsregels: {
    id: 'vfasGedragsregels',
    label: 'vFAS Gedragsregels zijn van toepassing',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'Mediator is gebonden aan de vFAS Gedragsregels voor Scheidingsmediators'
  } as TemplateField,

  // Familierecht
  familierecht: {
    id: 'familierecht',
    label: 'Het betreft familierecht',
    type: 'checkbox',
    defaultValue: true,
    helpText: 'De mediation betreft familierecht kwesties'
  } as TemplateField,

  // Bijstand advocaat
  bijstandAdvocaat: {
    id: 'bijstandAdvocaat',
    label: 'Mogen partijen zich laten bijstaan door een advocaat?',
    type: 'radio',
    options: [
      { value: 'ja', label: 'Ja, toegestaan' },
      { value: 'nee', label: 'Nee, niet toegestaan' },
      { value: 'vooraf', label: 'Alleen na voorafgaand overleg' }
    ],
    defaultValue: 'vooraf',
    required: true,
    helpText: 'Bepaal of en hoe partijen zich door een advocaat mogen laten bijstaan'
  } as TemplateField,

  // Kosten advocaten
  kostenpartijAdvocaten: {
    id: 'kostenpartijAdvocaten',
    label: 'Kosten eigen advocaten',
    type: 'textarea',
    placeholder: 'Partijen dragen ieder hun eigen advocaatkosten...',
    required: false,
    conditional: {
      field: 'bijstandAdvocaat',
      value: 'ja'
    },
    helpText: 'Specificeer hoe de kosten van eigen advocaten worden verdeeld'
  } as TemplateField,

  // Reistijd tarief
  reistijdTarief: {
    id: 'reistijdTarief',
    label: 'Tarief voor reistijd (€ per uur, optioneel)',
    type: 'number',
    placeholder: '75',
    required: false,
    helpText: 'Optioneel apart tarief voor reistijd'
  } as TemplateField,

  // Telefoon overleg tarief
  telefoonOverlegTarief: {
    id: 'telefoonOverlegTarief',
    label: 'Tarief voor telefonisch overleg (€ per uur, optioneel)',
    type: 'number',
    placeholder: '100',
    required: false,
    helpText: 'Optioneel apart tarief voor telefonisch overleg'
  } as TemplateField,

  // Mediation duur
  mediationDuur: {
    id: 'mediationDuur',
    label: 'Maximale duur mediation (optioneel)',
    type: 'text',
    placeholder: '6 maanden',
    required: false,
    helpText: 'Bijv: "De mediation duurt in beginsel ten hoogste 6 maanden"'
  } as TemplateField,

  // Gratis periode (alleen voor familiemediator)
  gratisPeriode: {
    id: 'gratisPeriode',
    label: 'Gratis periode voor familiemediator',
    type: 'text',
    placeholder: '2,5 uur',
    required: false,
    conditional: {
      field: 'mediatorVfasType',
      value: 'familiemediator'
    },
    helpText: 'Eerste aantal uur/contacturen die gratis zijn (standaard 2,5 uur)'
  } as TemplateField,

  // vFAS-specifiek kwestie onderwerp voor scheidingsmediation
  kwestieOnderwerpVfas: {
    id: 'kwestieOnderwerpVfas',
    label: 'Onderwerp van de scheiding/familiekwestie',
    type: 'select',
    required: true,
    options: [
      { value: 'echtscheiding', label: 'Echtscheiding en regeling van de gevolgen' },
      { value: 'echtscheiding_ouderschapsplan', label: 'Echtscheiding met ouderschapsplan' },
      { value: 'scheiding_levensonderhoud', label: 'Scheiding en levensonderhoud' },
      { value: 'scheiding_vermogen', label: 'Scheiding en vermogensverdeling' },
      { value: 'scheiding_woning', label: 'Scheiding en woningverdeling' },
      { value: 'partneralimentatie', label: 'Partneralimentatie' },
      { value: 'kinderalimentatie', label: 'Kinderalimentatie' },
      { value: 'omgangsregeling', label: 'Omgangsregeling kinderen' },
      { value: 'co_ouderschap', label: 'Co-ouderschap regeling' },
      { value: 'gezag', label: 'Gezagsregeling' },
      { value: 'beeindiging_samenleving', label: 'Beëindiging samenleving (ongehuwd)' },
      { value: 'geregistreerd_partnerschap', label: 'Ontbinding geregistreerd partnerschap' },
      { value: 'anders', label: 'Anders (familierecht gerelateerd)' }
    ],
    helpText: 'Kies het hoofdonderwerp van de familiemediation'
  } as TemplateField,

  // Conditioneel veld voor "anders"
  kwestieOnderwerpVfasAnders: {
    id: 'kwestieOnderwerpVfasAnders',
    label: 'Omschrijving andere familiekwestie',
    type: 'text',
    required: false,
    placeholder: 'bijv: verdeling erfenis, vermogensrechtelijke afspraken',
    conditional: {
      field: 'kwestieOnderwerpVfas',
      value: 'anders'
    },
    helpText: 'Beschrijf kort de familierecht gerelateerde kwestie'
  } as TemplateField,
};
