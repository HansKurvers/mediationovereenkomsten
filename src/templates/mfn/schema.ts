// ============================================
// FILE: src/templates/mfn/schema.ts
// MfN validation schema
// ============================================

import { z } from 'zod';
import { commonSchemas } from '../shared/commonSchema';

export const mfnSchema = z.object({
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
  mediatorMfnRegistratie: z.string().optional(),

  // Kwestie
  kwestieType: z.enum(['echtscheiding', 'arbeidsconflict', 'burengeschil', 'zakelijk', 'anders']),
  kwestieAndersOmschrijving: z.string().optional(),
  kwestieOmschrijving: z.string().optional(),

  // Mediation
  mediationStartdatum: z.string().optional(),
  gedragsregelsBijgevoegd: z.boolean().optional(),
  reglementBijgevoegd: z.boolean().optional(),

  // Honorarium
  honorariumBedrag: commonSchemas.bedrag,
  honorariumBTW: z.string(),
  mediationActiviteiten: z.array(z.string()).optional(),
  mediationActiviteitenAnders: z.string().optional(),
  activiteitenOnderUurtarief: z.string().optional(),
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
});
