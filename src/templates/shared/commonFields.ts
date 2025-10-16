// ============================================
// FILE: src/templates/shared/commonFields.ts
// Shared fields across all templates
// ============================================

import { TemplateField } from '../../types/template.types';

export const commonFields = {
  // Partij 1
  partij1Type: {
    id: 'partij1Type',
    label: 'Type partij',
    type: 'select',
    options: [
      { value: 'natuurlijk', label: 'Natuurlijk persoon' },
      { value: 'rechts', label: 'Rechtspersoon' }
    ],
    defaultValue: 'natuurlijk',
    required: true
  } as TemplateField,

  partij1Naam: {
    id: 'partij1Naam',
    label: 'Naam',
    type: 'text',
    placeholder: 'Volledige naam',
    required: true
  } as TemplateField,

  partij1Geboortedatum: {
    id: 'partij1Geboortedatum',
    label: 'Geboortedatum',
    type: 'date',
    required: false,
    conditional: {
      field: 'partij1Type',
      value: 'natuurlijk'
    }
  } as TemplateField,

  partij1Geboorteplaats: {
    id: 'partij1Geboorteplaats',
    label: 'Geboorteplaats',
    type: 'text',
    placeholder: 'Plaats',
    required: false,
    conditional: {
      field: 'partij1Type',
      value: 'natuurlijk'
    }
  } as TemplateField,

  partij1Adres: {
    id: 'partij1Adres',
    label: 'Adres (volledig)',
    type: 'text',
    placeholder: 'Straat, huisnummer, postcode, plaats',
    required: true
  } as TemplateField,

  partij1Vertegenwoordiger: {
    id: 'partij1Vertegenwoordiger',
    label: 'Vertegenwoordigd door',
    type: 'text',
    placeholder: 'Naam vertegenwoordiger',
    required: false
  } as TemplateField,

  // Partij 2
  partij2Type: {
    id: 'partij2Type',
    label: 'Type partij',
    type: 'select',
    options: [
      { value: 'natuurlijk', label: 'Natuurlijk persoon' },
      { value: 'rechts', label: 'Rechtspersoon' }
    ],
    defaultValue: 'natuurlijk',
    required: true
  } as TemplateField,

  partij2Naam: {
    id: 'partij2Naam',
    label: 'Naam',
    type: 'text',
    placeholder: 'Volledige naam',
    required: true
  } as TemplateField,

  partij2Geboortedatum: {
    id: 'partij2Geboortedatum',
    label: 'Geboortedatum',
    type: 'date',
    required: false,
    conditional: {
      field: 'partij2Type',
      value: 'natuurlijk'
    }
  } as TemplateField,

  partij2Geboorteplaats: {
    id: 'partij2Geboorteplaats',
    label: 'Geboorteplaats',
    type: 'text',
    placeholder: 'Plaats',
    required: false,
    conditional: {
      field: 'partij2Type',
      value: 'natuurlijk'
    }
  } as TemplateField,

  partij2Adres: {
    id: 'partij2Adres',
    label: 'Adres (volledig)',
    type: 'text',
    placeholder: 'Straat, huisnummer, postcode, plaats',
    required: true
  } as TemplateField,

  partij2Vertegenwoordiger: {
    id: 'partij2Vertegenwoordiger',
    label: 'Vertegenwoordigd door',
    type: 'text',
    placeholder: 'Naam vertegenwoordiger',
    required: false
  } as TemplateField,

  // Mediator
  mediatorNaam: {
    id: 'mediatorNaam',
    label: 'Naam mediator',
    type: 'text',
    placeholder: 'Volledige naam',
    required: true
  } as TemplateField,

  mediatorOrganisatie: {
    id: 'mediatorOrganisatie',
    label: 'Organisatie/Kantoor',
    type: 'text',
    placeholder: 'Naam kantoor',
    required: false
  } as TemplateField,

  mediatorAdres: {
    id: 'mediatorAdres',
    label: 'Adres kantoor',
    type: 'text',
    placeholder: 'Volledig adres',
    required: false
  } as TemplateField,

  // Kwestie
  kwestieType: {
    id: 'kwestieType',
    label: 'Type kwestie/geschil',
    type: 'select',
    options: [
      { value: 'echtscheiding', label: 'Echtscheiding' },
      { value: 'arbeidsconflict', label: 'Arbeidsconflict' },
      { value: 'burengeschil', label: 'Burengeschil' },
      { value: 'zakelijk', label: 'Zakelijk conflict' },
      { value: 'anders', label: 'Anders (specificeer hieronder)' }
    ],
    defaultValue: 'echtscheiding',
    required: true,
    helpText: 'Selecteer het type kwestie dat middels mediation wordt behandeld'
  } as TemplateField,

  kwestieAndersOmschrijving: {
    id: 'kwestieAndersOmschrijving',
    label: 'Omschrijving andere kwestie',
    type: 'text',
    placeholder: 'Beschrijf de kwestie',
    required: false,
    conditional: {
      field: 'kwestieType',
      value: 'anders'
    },
    helpText: 'Vul hier de specifieke kwestie in als u "Anders" heeft geselecteerd'
  } as TemplateField,

  kwestieOmschrijving: {
    id: 'kwestieOmschrijving',
    label: 'Aanvullende details (optioneel)',
    type: 'textarea',
    placeholder: 'Eventuele aanvullende informatie over de kwestie',
    required: false
  } as TemplateField,

  // Mediation start
  mediationStartdatum: {
    id: 'mediationStartdatum',
    label: 'Startdatum mediation',
    type: 'date',
    required: false
  } as TemplateField,

  // Honorarium
  honorariumBedrag: {
    id: 'honorariumBedrag',
    label: 'Honorarium per uur (EUR)',
    type: 'number',
    placeholder: '150',
    required: true
  } as TemplateField,

  honorariumBTW: {
    id: 'honorariumBTW',
    label: 'BTW percentage',
    type: 'select',
    options: [
      { value: '21', label: '21%' },
      { value: '9', label: '9%' },
      { value: '0', label: '0% (vrijgesteld)' }
    ],
    defaultValue: '21',
    required: true
  } as TemplateField,

  facturatieFrequentie: {
    id: 'facturatieFrequentie',
    label: 'Facturatie frequentie',
    type: 'select',
    options: [
      { value: 'maandelijks', label: 'Maandelijks' },
      { value: 'tweewekelijks', label: 'Tweewekelijks' },
      { value: 'per sessie', label: 'Per sessie' },
      { value: 'achteraf', label: 'Achteraf (bij afronding)' }
    ],
    defaultValue: 'maandelijks',
    required: true
  } as TemplateField,

  betalingstermijn: {
    id: 'betalingstermijnDagen',
    label: 'Betalingstermijn (dagen)',
    type: 'number',
    placeholder: '14',
    defaultValue: '14',
    required: true
  } as TemplateField,

  kostenverdelingPartij1: {
    id: 'kostenverdelingPartij1',
    label: 'Percentage partij 1',
    type: 'number',
    placeholder: '50',
    defaultValue: '50',
    required: true
  } as TemplateField,

  kostenverdelingPartij2: {
    id: 'kostenverdelingPartij2',
    label: 'Percentage partij 2',
    type: 'number',
    placeholder: '50',
    defaultValue: '50',
    required: true
  } as TemplateField,

  // Ondertekening
  ondertekenPlaats: {
    id: 'ondertekenPlaats',
    label: 'Plaats',
    type: 'text',
    placeholder: 'Stad',
    required: true
  } as TemplateField,

  ondertekenDatum: {
    id: 'ondertekenDatum',
    label: 'Datum',
    type: 'date',
    defaultValue: new Date().toISOString().split('T')[0],
    required: true
  } as TemplateField,

  aantalExemplaren: {
    id: 'aantalExemplaren',
    label: 'Aantal exemplaren',
    type: 'number',
    placeholder: '3',
    defaultValue: '3',
    required: true
  } as TemplateField,

  mediationActiviteiten: {
    id: 'mediationActiviteiten',
    label: 'Mediationactiviteiten',
    type: 'checkbox',
    options: [
      { value: 'intake', label: 'Intake' },
      { value: 'vooroverleg', label: 'Vooroverleg' },
      { value: 'gespreksvoering', label: 'Gespreksvoering' },
      { value: 'verslaglegging', label: 'Verslaglegging' },
      { value: 'correspondentie', label: 'Correspondentie' },
      { value: 'documentanalyse', label: 'Documentanalyse' },
      { value: 'conceptovereenkomst', label: 'Conceptovereenkomst' },
      { value: 'convenant', label: 'Convenant' },
      { value: 'ouderschapsplan', label: 'Ouderschapsplan' },
      { value: 'telefonisch_overleg', label: 'Telefonisch overleg' },
      { value: 'email_contact', label: 'E-mailcontact' },
      { value: 'reistijd', label: 'Reistijd' },
      { value: 'administratie', label: 'Administratie' },
      { value: 'voorbereiding', label: 'Voorbereiding' },
      { value: 'nazorg', label: 'Nazorg' },
      { value: 'overleg_derden', label: 'Overleg derden' },
      { value: 'bestudering_stukken', label: 'Bestudering stukken' },
      { value: 'berekeningen', label: 'Berekeningen' },
      { value: 'conflictdiagnose', label: 'Conflictdiagnose' },
      { value: 'huur_ruimte', label: 'Huur ruimte' },
      { value: 'anders', label: 'Anders' }
    ],
    defaultValue: ['intake', 'gespreksvoering', 'verslaglegging', 'conceptovereenkomst', 'correspondentie'],
    required: false,
    helpText: 'Selecteer de werkzaamheden waarop de vergoeding betrekking heeft'
  } as TemplateField,

  mediationActiviteitenAnders: {
    id: 'mediationActiviteitenAnders',
    label: 'Specificeer andere activiteit',
    type: 'text',
    placeholder: 'Beschrijf de andere activiteit',
    required: false,
    conditional: {
      field: 'mediationActiviteiten',
      value: 'anders'
    }
  } as TemplateField,
};
