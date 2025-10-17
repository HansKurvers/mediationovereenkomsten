// ============================================
// FILE: src/templates/adr/schema.ts
// ADR validation schema
// ============================================

import { z } from 'zod';
import { commonSchemas } from '../shared/commonSchema';

export const adrSchema = z.object({
  // Partij 1
  partij1Type: z.enum(['natuurlijk', 'rechts']),
  partij1Naam: commonSchemas.naam,
  partij1Geboortedatum: z.string().optional(),
  partij1Geboorteplaats: z.string().optional(),
  partij1Adres: commonSchemas.adres,
  partij1Vertegenwoordiger: z.string().optional(),

  // Partij 2
  partij2Type: z.enum(['natuurlijk', 'rechts']),
  partij2Naam: commonSchemas.naam,
  partij2Geboortedatum: z.string().optional(),
  partij2Geboorteplaats: z.string().optional(),
  partij2Adres: commonSchemas.adres,
  partij2Vertegenwoordiger: z.string().optional(),

  // Mediator
  mediatorNaam: commonSchemas.naam,
  mediatorAdrRegistratie: z.string()
    .regex(/^ADR-\d+$/, 'ADR registratienummer moet format ADR-12345 hebben')
    .optional()
    .or(z.literal('')),

  // Mediator rollen
  mediatorRollen: z.array(z.enum(['mediator', 'conflictcoach', 'negotiator']))
    .min(1, 'Selecteer minimaal één rol'),

  // Kwestie
  kwestieType: z.enum(['echtscheiding', 'arbeidsconflict', 'burengeschil', 'zakelijk', 'anders']),
  kwestieAndersOmschrijving: z.string().optional(),
  kwestieOmschrijving: z.string().optional(),

  // Mediation
  mediationStartdatum: z.string().optional(),

  // ADR specifiek
  subsidieMogelijk: z.enum(['ja', 'nee']),
  subsidieBijToevoeging: z.string().optional(),
  meldcodeHuiselijkGeweld: z.boolean().optional(),
  opnameverbod: z.boolean().optional(),
  adrReglement: z.enum(['PD.002', 'PD.003', 'GNG.PD.007']),

  // Honorarium
  honorariumBedrag: commonSchemas.bedrag,
  honorariumBTW: z.string(),
  conflictcoachTarief: z.string().optional(),
  negotiatorTarief: z.string().optional(),
  mediationActiviteiten: z.array(z.string()).optional(),
  mediationActiviteitenAnders: z.string().optional(),
  facturatieFrequentie: z.string(),
  betalingstermijnDagen: commonSchemas.getal,
  kostenverdelingPartij1: commonSchemas.percentage,
  kostenverdelingPartij2: commonSchemas.percentage,

  // Ondertekening
  aantalExemplaren: commonSchemas.getal,
  ondertekenPlaats: z.string().min(2, 'Plaats is verplicht'),
  ondertekenDatum: commonSchemas.datum,
}).refine(data => {
  // Validatie: percentages moeten optellen tot 100%
  const p1 = parseInt(data.kostenverdelingPartij1);
  const p2 = parseInt(data.kostenverdelingPartij2);
  return p1 + p2 === 100;
}, {
  message: 'Percentages moeten optellen tot 100%',
  path: ['kostenverdelingPartij1']
}).refine(data => {
  // Validatie: als subsidie=ja, dan toevoegingsnummer verplicht
  if (data.subsidieMogelijk === 'ja') {
    return data.subsidieBijToevoeging && data.subsidieBijToevoeging.length > 0;
  }
  return true;
}, {
  message: 'Toevoegingsnummer is verplicht wanneer subsidie van toepassing is',
  path: ['subsidieBijToevoeging']
}).refine(data => {
  // Validatie: conflictcoach tarief verplicht als rol geselecteerd
  if (data.mediatorRollen && data.mediatorRollen.includes('conflictcoach')) {
    const tarief = data.conflictcoachTarief;
    return tarief && tarief.length > 0 && parseFloat(tarief) > 0;
  }
  return true;
}, {
  message: 'Tarief is verplicht wanneer conflictcoach rol geselecteerd is',
  path: ['conflictcoachTarief']
}).refine(data => {
  // Validatie: negotiator tarief verplicht als rol geselecteerd
  if (data.mediatorRollen && data.mediatorRollen.includes('negotiator')) {
    const tarief = data.negotiatorTarief;
    return tarief && tarief.length > 0 && parseFloat(tarief) > 0;
  }
  return true;
}, {
  message: 'Tarief is verplicht wanneer negotiator rol geselecteerd is',
  path: ['negotiatorTarief']
});
