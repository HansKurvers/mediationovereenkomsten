// ============================================
// FILE: src/templates/vfas/schema.ts
// vFAS validation schema
// ============================================

import { z } from 'zod';
import { commonSchemas } from '../shared/commonSchema';

export const vfasSchema = z.object({
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
  mediatorVfasType: z.enum(['aspirant', 'lid', 'familiemediator']),
  mediatorVfasRegistratie: z.string().optional(),
  mediatorKantoorVestiging: z.string().min(2, 'Kantoorvestiging is verplicht'),

  // vFAS specifiek
  scheidingsmediation: z.boolean().optional(),
  ouderschapsplanNodig: z.enum(['ja', 'nee']),
  ouderschapsplanBijlage: z.boolean().optional(),
  verschoningsrechtAdvocaat: z.boolean().optional(),
  vfasGedragsregels: z.boolean().optional(),
  familierecht: z.boolean().optional(),
  bijstandAdvocaat: z.enum(['ja', 'nee', 'vooraf']),
  kostenpartijAdvocaten: z.string().optional(),
  reistijdTarief: z.string().optional(),
  telefoonOverlegTarief: z.string().optional(),
  mediationDuur: z.string().optional(),
  gratisPeriode: z.string().optional(),

  // Kwestie
  kwestieType: z.enum(['echtscheiding', 'arbeidsconflict', 'burengeschil', 'zakelijk', 'anders']),
  kwestieAndersOmschrijving: z.string().optional(),
  kwestieOmschrijving: z.string().optional(),

  // vFAS-specifieke kwestie onderwerpen
  kwestieOnderwerpVfas: z.string().min(1, 'Kies een onderwerp'),
  kwestieOnderwerpVfasAnders: z.string().optional(),

  // Mediation
  mediationStartdatum: z.string().optional(),

  // Honorarium
  honorariumBedrag: commonSchemas.bedrag,
  honorariumBTW: z.string(),
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
  // Validatie: als ouderschapsplan nodig en bijlage aangevinkt, check consistent
  if (data.ouderschapsplanNodig === 'ja' && data.ouderschapsplanBijlage) {
    return true;
  }
  return true;
}, {
  message: 'Ouderschapsplan bijlage instelling is inconsistent',
  path: ['ouderschapsplanBijlage']
}).refine(data => {
  // Validatie: als kwestieOnderwerpVfas "anders" is, moet er een omschrijving zijn
  if (data.kwestieOnderwerpVfas === 'anders') {
    return data.kwestieOnderwerpVfasAnders && data.kwestieOnderwerpVfasAnders.length > 0;
  }
  return true;
}, {
  message: 'Bij "Anders" is een omschrijving verplicht',
  path: ['kwestieOnderwerpVfasAnders']
});
