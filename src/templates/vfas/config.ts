// ============================================
// FILE: src/templates/vfas/config.ts
// vFAS template configuration
// ============================================

import { TemplateConfig, TemplateSection } from '../../types/template.types';
import { commonFields } from '../shared/commonFields';
import { vfasFields } from './fields';
import { vfasSchema } from './schema';

const vfasSections: TemplateSection[] = [
  {
    id: 'mediator',
    title: 'Mediator',
    order: 1,
    fields: [
      vfasFields.mediatorVfasType, // BELANGRIJK: Dit veld eerst!
      commonFields.mediatorNaam,
      vfasFields.mediatorVfasRegistratie,
      vfasFields.mediatorKantoorVestiging,
    ]
  },
  {
    id: 'partij1',
    title: 'Deelnemer A',
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
    title: 'Deelnemer B',
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
    title: 'Kwestie',
    order: 4,
    fields: [
      vfasFields.kwestieOnderwerpVfas,
      vfasFields.kwestieOnderwerpVfasAnders,
      commonFields.kwestieOmschrijving,
      vfasFields.scheidingsmediation,
      vfasFields.ouderschapsplanNodig,
      vfasFields.ouderschapsplanBijlage,
    ]
  },
  {
    id: 'mediation',
    title: 'Mediation',
    order: 5,
    fields: [
      commonFields.mediationStartdatum,
      vfasFields.mediationDuur,
      vfasFields.verschoningsrechtAdvocaat,
      vfasFields.vfasGedragsregels,
      vfasFields.familierecht,
    ]
  },
  {
    id: 'bijstand',
    title: 'Bijstand en advisering',
    order: 6,
    fields: [
      vfasFields.bijstandAdvocaat,
      vfasFields.kostenpartijAdvocaten,
    ]
  },
  {
    id: 'honorarium',
    title: 'Honoraria en kosten',
    order: 7,
    fields: [
      commonFields.honorariumBedrag,
      commonFields.honorariumBTW,
      vfasFields.gratisPeriode,
      vfasFields.reistijdTarief,
      vfasFields.telefoonOverlegTarief,
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
    order: 8,
    fields: [
      commonFields.aantalExemplaren,
      commonFields.ondertekenPlaats,
      commonFields.ondertekenDatum,
    ]
  },
];

export const vfasConfig: TemplateConfig = {
  metadata: {
    id: 'vfas',
    name: 'vFAS',
    fullName: 'vFAS Mediationovereenkomst',
    description: 'Advocaat-mediator overeenkomst volgens vFAS-standaard',
    version: '2024.1',
    organization: 'vereniging FAS',
    color: '#8B5CF6', // Purple
  },
  sections: vfasSections,
  schema: vfasSchema,
  defaultValues: {
    partij1Type: 'natuurlijk',
    partij2Type: 'natuurlijk',
    kwestieType: 'echtscheiding',
    kwestieOnderwerpVfas: 'echtscheiding',
    mediatorVfasType: 'lid',
    scheidingsmediation: true,
    ouderschapsplanNodig: 'nee',
    verschoningsrechtAdvocaat: true,
    vfasGedragsregels: true,
    familierecht: true,
    bijstandAdvocaat: 'vooraf',
    gratisPeriode: '2,5',
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
