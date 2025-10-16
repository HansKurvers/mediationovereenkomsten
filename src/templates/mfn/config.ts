// ============================================
// FILE: src/templates/mfn/config.ts
// MfN template configuration
// ============================================

import { TemplateConfig, TemplateSection } from '../../types/template.types';
import { commonFields } from '../shared/commonFields';
import { mfnFields } from './fields';
import { mfnSchema } from './schema';

const mfnSections: TemplateSection[] = [
  {
    id: 'mediator',
    title: 'Mediator',
    order: 1,
    fields: [
      commonFields.mediatorNaam,
      mfnFields.mediatorMfnRegistratie,
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
    title: '2. Mediation',
    order: 5,
    fields: [
      commonFields.mediationStartdatum,
      mfnFields.reglementBijgevoegd,
      mfnFields.gedragsregelsBijgevoegd,
    ]
  },
  {
    id: 'honorarium',
    title: '7. Honoraria en kosten',
    order: 6,
    fields: [
      commonFields.honorariumBedrag,
      commonFields.honorariumBTW,
      commonFields.mediationActiviteiten,
      commonFields.mediationActiviteitenAnders,
      mfnFields.activiteitenOnderUurtarief,
      commonFields.facturatieFrequentie,
      commonFields.betalingstermijn,
      commonFields.kostenverdelingPartij1,
      commonFields.kostenverdelingPartij2,
    ]
  },
  {
    id: 'ondertekening',
    title: 'Ondertekening',
    order: 7,
    fields: [
      commonFields.aantalExemplaren,
      commonFields.ondertekenPlaats,
      commonFields.ondertekenDatum,
    ]
  },
];

export const mfnConfig: TemplateConfig = {
  metadata: {
    id: 'mfn',
    name: 'MfN',
    fullName: 'Mediatorsfederatie Nederland',
    description: 'Model mediationovereenkomst volgens MfN-standaard',
    version: '2023.1',
    organization: 'Mediatorsfederatie Nederland',
    color: '#0EA5E9', // Sky blue
  },
  sections: mfnSections,
  schema: mfnSchema,
  defaultValues: {
    partij1Type: 'natuurlijk',
    partij2Type: 'natuurlijk',
    kwestieType: 'echtscheiding',
    honorariumBTW: '21',
    mediationActiviteiten: ['intake', 'gespreksvoering', 'verslaglegging', 'conceptovereenkomst', 'correspondentie'],
    facturatieFrequentie: 'maandelijks',
    betalingstermijnDagen: '14',
    kostenverdelingPartij1: '50',
    kostenverdelingPartij2: '50',
    aantalExemplaren: '3',
    ondertekenDatum: new Date().toISOString().split('T')[0],
    gedragsregelsBijgevoegd: true,
    reglementBijgevoegd: true,
  }
};
