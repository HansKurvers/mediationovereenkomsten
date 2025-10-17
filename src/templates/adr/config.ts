// ============================================
// FILE: src/templates/adr/config.ts
// ADR template configuration
// ============================================

import { TemplateConfig, TemplateSection } from '../../types/template.types';
import { commonFields } from '../shared/commonFields';
import { adrFields } from './fields';
import { adrSchema } from './schema';

const adrSections: TemplateSection[] = [
  {
    id: 'mediator',
    title: 'Mediator',
    order: 1,
    fields: [
      commonFields.mediatorNaam,
      adrFields.mediatorAdrRegistratie,
      adrFields.mediatorRollen,
    ]
  },
  {
    id: 'partij1',
    title: 'Partij A',
    order: 2,
    fields: [
      commonFields.partij1Type,
      commonFields.partij1Naam,
      commonFields.partij1Geboortedatum,
      commonFields.partij1Geboorteplaats,
      commonFields.partij1Adres,
      commonFields.partij1Vertegenwoordiger,
    ]
  },
  {
    id: 'partij2',
    title: 'Partij B',
    order: 3,
    fields: [
      commonFields.partij2Type,
      commonFields.partij2Naam,
      commonFields.partij2Geboortedatum,
      commonFields.partij2Geboorteplaats,
      commonFields.partij2Adres,
      commonFields.partij2Vertegenwoordiger,
    ]
  },
  {
    id: 'kwestie',
    title: '1. Globale omschrijving van de kwestie',
    order: 4,
    fields: [
      commonFields.kwestieType,
      commonFields.kwestieAndersOmschrijving,
      commonFields.kwestieOmschrijving,
    ]
  },
  {
    id: 'mediation',
    title: '2. Aanvang mediation',
    order: 5,
    fields: [
      commonFields.mediationStartdatum,
      adrFields.adrReglement,
    ]
  },
  {
    id: 'adr-specifiek',
    title: 'ADR-specifieke bepalingen',
    order: 6,
    fields: [
      adrFields.meldcodeHuiselijkGeweld,
      adrFields.opnameverbod,
    ]
  },
  {
    id: 'subsidie',
    title: 'Subsidie en toevoeging',
    order: 7,
    fields: [
      adrFields.subsidieMogelijk,
      adrFields.subsidieBijToevoeging,
    ]
  },
  {
    id: 'honorarium',
    title: '10. Honoraria en kosten',
    order: 8,
    fields: [
      commonFields.honorariumBedrag,
      adrFields.conflictcoachTarief,
      adrFields.negotiatorTarief,
      commonFields.honorariumBTW,
      commonFields.mediationActiviteiten,
      commonFields.mediationActiviteitenAnders,
      commonFields.facturatieFrequentie,
      commonFields.betalingstermijn,
      commonFields.kostenverdelingPartij1,
      commonFields.kostenverdelingPartij2,
    ]
  },
  {
    id: 'ondertekening',
    title: 'Ondertekening',
    order: 9,
    fields: [
      commonFields.aantalExemplaren,
      commonFields.ondertekenPlaats,
      commonFields.ondertekenDatum,
    ]
  },
];

export const adrConfig: TemplateConfig = {
  metadata: {
    id: 'adr',
    name: 'ADR',
    fullName: 'ADR Mediationovereenkomst',
    description: 'ADR-gecertificeerde mediation met subsidie mogelijkheden',
    version: '2024.1',
    organization: 'ADR Instituut',
    color: '#10B981', // Green
  },
  sections: adrSections,
  schema: adrSchema,
  defaultValues: {
    partij1Type: 'natuurlijk',
    partij2Type: 'natuurlijk',
    kwestieType: 'echtscheiding',
    mediatorRollen: ['mediator'],
    subsidieMogelijk: 'nee',
    meldcodeHuiselijkGeweld: true,
    opnameverbod: true,
    adrReglement: 'PD.002',
    honorariumBTW: '21',
    mediationActiviteiten: ['intake', 'gespreksvoering', 'verslaglegging', 'conceptovereenkomst', 'correspondentie'],
    facturatieFrequentie: 'maandelijks',
    betalingstermijnDagen: '14',
    kostenverdelingPartij1: '50',
    kostenverdelingPartij2: '50',
    aantalExemplaren: '3',
    ondertekenDatum: new Date().toISOString().split('T')[0],
  }
};
