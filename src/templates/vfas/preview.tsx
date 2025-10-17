// ============================================
// FILE: src/templates/vfas/preview.tsx
// vFAS preview component with dynamic content based on mediator type
// ============================================

import React from 'react';
import { formatDateLong } from '../../utils/dateFormat';

interface VfasPreviewProps {
  data: any;
}

const getValue = (value: string, placeholder?: string): string => {
  return value || (placeholder ? `[${placeholder}]` : '');
};

const getVfasKwestieText = (onderwerp: string, andersOmschrijving?: string): string => {
  const texts: { [key: string]: string } = {
    'echtscheiding': 'het regelen van hun echtscheiding en alle gevolgen daarvan',
    'echtscheiding_ouderschapsplan': 'het regelen van hun echtscheiding inclusief het opstellen van een ouderschapsplan',
    'scheiding_levensonderhoud': 'het regelen van hun scheiding en de kwestie van levensonderhoud',
    'scheiding_vermogen': 'het regelen van hun scheiding en de verdeling van het gezamenlijke vermogen',
    'scheiding_woning': 'het regelen van hun scheiding en de verdeling van de gezamenlijke woning',
    'partneralimentatie': 'het regelen van de partneralimentatie',
    'kinderalimentatie': 'het regelen van de kinderalimentatie',
    'omgangsregeling': 'het opstellen van een omgangsregeling voor hun minderjarige kinderen',
    'co_ouderschap': 'het regelen van een co-ouderschapsregeling',
    'gezag': 'het regelen van de gezagsregeling over hun minderjarige kinderen',
    'beeindiging_samenleving': 'het regelen van de beëindiging van hun samenleving en alle gevolgen daarvan',
    'geregistreerd_partnerschap': 'het regelen van de ontbinding van hun geregistreerd partnerschap en alle gevolgen daarvan',
    'anders': andersOmschrijving || '[specificeer de familiekwestie]'
  };
  return texts[onderwerp] || texts['echtscheiding'];
};

// Unused but kept for future use
// const getActiviteitLabel = (value: string): string => {
//   const labels: { [key: string]: string } = {
//     'intake': 'Intake',
//     'vooroverleg': 'Vooroverleg',
//     'gespreksvoering': 'Gespreksvoering',
//     'verslaglegging': 'Verslaglegging',
//     'correspondentie': 'Correspondentie',
//     'documentanalyse': 'Documentanalyse',
//     'conceptovereenkomst': 'Conceptovereenkomst',
//     'convenant': 'Convenant',
//     'ouderschapsplan': 'Ouderschapsplan',
//     'telefonisch_overleg': 'Telefonisch overleg',
//     'email_contact': 'E-mailcontact',
//     'reistijd': 'Reistijd',
//     'administratie': 'Administratie',
//     'voorbereiding': 'Voorbereiding',
//     'nazorg': 'Nazorg',
//     'overleg_derden': 'Overleg derden',
//     'bestudering_stukken': 'Bestudering stukken',
//     'berekeningen': 'Berekeningen',
//     'conflictdiagnose': 'Conflictdiagnose',
//     'huur_ruimte': 'Huur ruimte'
//   };
//   return labels[value] || value;
// };

// Helper functions voor dynamische content
const getTitel = (mediatorType: string, isScheiding: boolean): string => {
  const scheidingPrefix = isScheiding ? '(SCHEIDINGS)' : '';
  switch (mediatorType) {
    case 'aspirant':
      return `vFAS- ${scheidingPrefix}MEDIATIONOVEREENKOMST vFAS ASPIRANT-LID (advocaat-mediator)`;
    case 'lid':
      return `vFAS- ${scheidingPrefix}MEDIATIONOVEREENKOMST vFAS-LID (advocaat-mediator)`;
    case 'familiemediator':
      return `vFAS- ${scheidingPrefix}MEDIATIONOVEREENKOMST FAMILIEMEDIATOR`;
    default:
      return `vFAS- ${scheidingPrefix}MEDIATIONOVEREENKOMST`;
  }
};

const getMediatorBeschrijving = (data: any): string => {
  const naam = getValue(data.mediatorNaam, 'naam mediator');
  const vestiging = getValue(data.mediatorKantoorVestiging, 'vestiging');
  const type = data.mediatorVfasType || 'lid';

  switch (type) {
    case 'aspirant':
      return `Mr. ${naam}, in deze optredend als advocaat-mediator, kantoorhoudende te ${vestiging}. Mr. ${naam} is aspirant-lid van de vFAS (www.verenigingFAS.nl). Hij is gebonden aan de Gedragsregels voor Scheidingsmediators van de vFAS.`;
    case 'lid':
      return `Mr. ${naam}, in deze optredend als advocaat-mediator, kantoorhoudende te ${vestiging}. Mr. ${naam} is advocaat-lid van de vFAS (www.verenigingFAS.nl). Hij is gebonden aan de Gedragsregels voor Scheidingsmediators van de vFAS.`;
    case 'familiemediator':
      return `De vFAS-advocaat familiemediator, mr. ${naam}, in deze optredend als vFAS-advocaat-scheidingsmediator, kantoorhoudende te ${vestiging}. Mr. ${naam} is volledig gekwalificeerd advocaat-familiemediator van de vFAS (www.verenigingFAS.nl). Hij is gebonden aan de Gedragsregels voor Scheidingsmediators van de vFAS.`;
    default:
      return `Mr. ${naam}, kantoorhoudende te ${vestiging}.`;
  }
};

const getMediatorTypeNaam = (mediatorType: string): string => {
  switch (mediatorType) {
    case 'aspirant':
      return 'advocaat-mediator (aspirant-lid)';
    case 'lid':
      return 'advocaat-mediator';
    case 'familiemediator':
      return 'vFAS-advocaat familiemediator';
    default:
      return 'mediator';
  }
};

// Helper component for sub-articles
const SubArticle: React.FC<{ number: string; children: React.ReactNode }> = ({ number, children }) => (
  <div style={{ display: 'flex', marginBottom: '12px', lineHeight: '1.6' }}>
    <div style={{ minWidth: '40px', fontWeight: 'bold' }}>{number}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export const VfasPreview: React.FC<VfasPreviewProps> = ({ data }) => {
  const mediatorType = data.mediatorVfasType || 'lid';
  const isFamiliemediator = mediatorType === 'familiemediator';
  const isScheiding = data.scheidingsmediation || false;
  const gratisPeriode = data.gratisPeriode || '2,5';

  return (
    <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.6', padding: '20px' }}>
      {/* Dynamische titel */}
      <h1 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', textTransform: 'uppercase' }}>
        {getTitel(mediatorType, isScheiding)}
      </h1>

      {/* Preambule */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ marginBottom: '16px' }}>
          <strong>De ondergetekenden:</strong>
        </p>
      </div>

      {/* Mediator - dynamische beschrijving */}
      <div style={{ marginBottom: '24px' }} data-field="mediatorNaam">
        <p data-field="mediatorVfasType">{getMediatorBeschrijving(data)}</p>
        {data.mediatorVfasRegistratie && (
          <p style={{ marginTop: '8px', fontStyle: 'italic' }} data-field="mediatorVfasRegistratie">
            vFAS registratienummer: {data.mediatorVfasRegistratie}
          </p>
        )}
      </div>

      <p style={{ marginBottom: '24px' }}>en</p>

      {/* Deelnemer A */}
      <div style={{ marginBottom: '16px' }} data-field="partij1Naam">
        <p>
          <strong>Deelnemer A:</strong> {getValue(data.partij1Naam, 'naam deelnemer A')}
          {data.partij1Type === 'natuurlijk' && data.partij1Geboortedatum && (
            <span data-field="partij1Geboortedatum">, geboren op {formatDateLong(data.partij1Geboortedatum)}</span>
          )}
          {data.partij1Type === 'natuurlijk' && data.partij1Geboorteplaats && (
            <span data-field="partij1Geboorteplaats"> te {data.partij1Geboorteplaats}</span>
          )}
          <span data-field="partij1Adres">, {data.partij1Type === 'natuurlijk' ? 'wonende' : 'gevestigd'} te {getValue(data.partij1Adres, 'adres')}</span>
        </p>
        {data.partij1Vertegenwoordiger && (
          <p style={{ marginLeft: '20px', fontStyle: 'italic' }} data-field="partij1Vertegenwoordiger">
            hier vertegenwoordigd door: {data.partij1Vertegenwoordiger}
          </p>
        )}
      </div>

      <p style={{ marginBottom: '16px' }}>en</p>

      {/* Deelnemer B */}
      <div style={{ marginBottom: '24px' }} data-field="partij2Naam">
        <p>
          <strong>Deelnemer B:</strong> {getValue(data.partij2Naam, 'naam deelnemer B')}
          {data.partij2Type === 'natuurlijk' && data.partij2Geboortedatum && (
            <span data-field="partij2Geboortedatum">, geboren op {formatDateLong(data.partij2Geboortedatum)}</span>
          )}
          {data.partij2Type === 'natuurlijk' && data.partij2Geboorteplaats && (
            <span data-field="partij2Geboorteplaats"> te {data.partij2Geboorteplaats}</span>
          )}
          <span data-field="partij2Adres">, {data.partij2Type === 'natuurlijk' ? 'wonende' : 'gevestigd'} te {getValue(data.partij2Adres, 'adres')}</span>
        </p>
        {data.partij2Vertegenwoordiger && (
          <p style={{ marginLeft: '20px', fontStyle: 'italic' }} data-field="partij2Vertegenwoordiger">
            hier vertegenwoordigd door: {data.partij2Vertegenwoordiger}
          </p>
        )}
      </div>

      {/* NEMEN IN AANMERKING */}
      <p style={{ marginBottom: '16px', fontWeight: 'bold', textTransform: 'uppercase' }}>Nemen in aanmerking:</p>

      <ul style={{ marginBottom: '24px', marginLeft: '40px', listStyleType: 'disc' }}>
        <li data-field="kwestieOnderwerpVfas">Dat deelnemers zich tot de {getMediatorTypeNaam(mediatorType)} hebben gewend met het verzoek hen bij te staan bij {getVfasKwestieText(data.kwestieOnderwerpVfas || data.kwestieType, data.kwestieOnderwerpVfasAnders || data.kwestieAndersOmschrijving)};</li>
        {data.familierecht && (
          <li data-field="familierecht">Dat het familierecht betreft;</li>
        )}
        {data.ouderschapsplanNodig === 'ja' && (
          <li data-field="ouderschapsplanNodig">Dat er minderjarige kinderen zijn en dat een ouderschapsplan moet worden opgesteld;</li>
        )}
        {data.vfasGedragsregels && (
          <li data-field="vfasGedragsregels">Dat de {getMediatorTypeNaam(mediatorType)} gebonden is aan de Gedragsregels voor Scheidingsmediators van de vFAS;</li>
        )}
        {data.verschoningsrechtAdvocaat && (
          <li data-field="verschoningsrechtAdvocaat">Dat de {getMediatorTypeNaam(mediatorType)} als advocaat een wettelijk verschoningsrecht heeft;</li>
        )}
      </ul>

      <p style={{ marginBottom: '32px' }}>
        <strong>KOMEN HET VOLGENDE OVEREEN:</strong>
      </p>

      {/* Artikel 1 - Algemeen */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 1 – Algemeen
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="1.1">
          Deelnemers geven de {getMediatorTypeNaam(mediatorType)} opdracht tot het begeleiden van het mediationproces gericht op het bereiken van een minnelijke regeling van de tussen deelnemers bestaande geschillen.
          {data.kwestieOmschrijving && (
            <span data-field="kwestieOmschrijving"> Nadere omschrijving: {data.kwestieOmschrijving}.</span>
          )}
        </SubArticle>
        {data.vfasGedragsregels && (
          <SubArticle number="1.2">
            De {getMediatorTypeNaam(mediatorType)} is gebonden aan de Gedragsregels voor Scheidingsmediators van de vFAS zoals deze luiden op de datum van deze overeenkomst.
          </SubArticle>
        )}
      </div>

      {/* Artikel 2 - Verantwoordelijkheden mediator */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 2 – Verantwoordelijkheden {getMediatorTypeNaam(mediatorType)}
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="2.1">
          De {getMediatorTypeNaam(mediatorType)} is verantwoordelijk voor de begeleiding van het mediationproces en zal daarbij onpartijdig en onafhankelijk optreden.
        </SubArticle>
        <SubArticle number="2.2">
          De {getMediatorTypeNaam(mediatorType)} zal erop toezien dat beide deelnemers gelijkwaardig aan de mediation kunnen deelnemen.
        </SubArticle>
        <SubArticle number="2.3">
          De {getMediatorTypeNaam(mediatorType)} kan deelnemers adviseren zich te laten bijstaan door deskundigen (advocaten, accountants, fiscalisten, psychologen, etc.).
        </SubArticle>
      </div>

      {/* Artikel 3 - Verantwoordelijkheden partijen */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 3 – Verantwoordelijkheden deelnemers
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="3.1">
          Deelnemers spannen zich in om tot een minnelijke regeling te komen. Zij verstrekken elkaar en de {getMediatorTypeNaam(mediatorType)} alle voor de mediation relevante informatie.
        </SubArticle>
        <SubArticle number="3.2">
          Deelnemers zullen zich houden aan de Gedragsregels voor Scheidingsmediators van de vFAS, waaronder:
          <ul style={{ marginTop: '8px', marginLeft: '20px', listStyleType: 'circle' }}>
            {isFamiliemediator && (
              <>
                <li>De mediation vindt plaats op basis van vrijwilligheid</li>
                <li>Lopende of voorgenomen gerechtelijke procedures worden besproken</li>
                <li>Er vindt een slotbijeenkomst plaats met monitoringformulieren</li>
                <li>Verplichtingen blijven bestaan na beëindiging mediation</li>
                {data.mediationDuur && (
                  <li data-field="mediationDuur">De mediation duurt in beginsel ten hoogste {data.mediationDuur}</li>
                )}
              </>
            )}
            <li>Deelnemers verstrekken alle relevante informatie</li>
            <li>Deelnemers zullen geen acties ondernemen die de mediation belemmeren</li>
            <li>Deelnemers respecteren elkaars standpunten</li>
          </ul>
        </SubArticle>
        <SubArticle number="3.3">
          Deelnemers zijn verantwoordelijk voor de inhoud van de afspraken. Zij kunnen zich laten adviseren door deskundigen.
        </SubArticle>
      </div>

      {/* Artikel 4 - Beëindiging */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 4 – Beëindiging
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="4.1">
          Elke deelnemer en de {getMediatorTypeNaam(mediatorType)} kunnen de mediation te allen tijde beëindigen. Beëindiging geschiedt schriftelijk.
        </SubArticle>
        <SubArticle number="4.2">
          De {getMediatorTypeNaam(mediatorType)} kan de mediation beëindigen indien naar zijn oordeel een evenwichtige deelname van beide deelnemers niet (meer) mogelijk is, of indien voortzetting van de mediation niet zinvol is.
        </SubArticle>
      </div>

      {/* Artikel 5 - Overeenkomst, deelafspraken */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 5 – Overeenkomst, deelafspraken
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="5.1">
          Een tussen deelnemers tot stand gekomen convenant is bindend.
          {data.ouderschapsplanNodig === 'ja' && data.ouderschapsplanBijlage && (
            <span data-field="ouderschapsplanBijlage"> Het ouderschapsplan vormt een bijlage bij het convenant.</span>
          )}
        </SubArticle>
        <SubArticle number="5.2">
          Wijzigingen of aanvullingen op het convenant dienen schriftelijk te worden overeengekomen.
        </SubArticle>
        <SubArticle number="5.3">
          Tijdens de mediation gemaakte deelafspraken binden deelnemers alleen indien deze schriftelijk zijn vastgelegd en uitdrukkelijk als bindend zijn aangemerkt.
        </SubArticle>
        <SubArticle number="5.4">
          Deelnemers zijn zelf verantwoordelijk voor de inhoud van het convenant en eventuele deelafspraken. Zij kunnen zich daarbij laten adviseren door deskundigen.
        </SubArticle>
      </div>

      {/* Artikel 6 - Vertrouwelijkheid en verschoningsrecht */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 6 – Vertrouwelijkheid en verschoningsrecht
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="6.1">
          Alles wat tijdens de mediation wordt besproken is vertrouwelijk. Deelnemers en de {getMediatorTypeNaam(mediatorType)} mogen deze informatie niet zonder toestemming van de ander aan derden verstrekken.
        </SubArticle>
        <SubArticle number="6.2">
          De {getMediatorTypeNaam(mediatorType)} kan deelnemers adviseren zich door deskundigen te laten bijstaan. Deze deskundigen zijn eveneens gebonden aan vertrouwelijkheid.
        </SubArticle>
        <SubArticle number="6.3">
          Indien een deelnemer informatie aan een derde verstrekt, gebeurt dit op eigen verantwoordelijkheid.
        </SubArticle>
        <SubArticle number="6.4">
          Deze overeenkomst geldt als bewijsovereenkomst in de zin van artikel 153 Rv. De {getMediatorTypeNaam(mediatorType)} en deelnemers kunnen niet als getuige worden opgeroepen over hetgeen tijdens de mediation is besproken.
        </SubArticle>
        <SubArticle number="6.5">
          Het tot stand gekomen convenant is niet vertrouwelijk, tenzij deelnemers anders overeenkomen.
        </SubArticle>
        <SubArticle number="6.6">
          Een bindende deelafspraak als bedoeld in artikel 5.3 is niet vertrouwelijk.
        </SubArticle>
        <SubArticle number="6.7">
          Deelnemers kunnen de vertrouwelijkheid opheffen door gezamenlijk schriftelijk akkoord.
        </SubArticle>
        <SubArticle number="6.8">
          In geval van een geschil over de werkzaamheden van de {getMediatorTypeNaam(mediatorType)} kan de vertrouwelijkheid worden opgeheven voor zover noodzakelijk voor behandeling van het geschil.
        </SubArticle>
      </div>

      {/* Artikel 7 - Geschillenregeling en aansprakelijkheid */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 7 – Geschillenregeling en aansprakelijkheid
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="7.1">
          Op eventuele klachten over de werkzaamheden van de {getMediatorTypeNaam(mediatorType)} is het vFAS Klachtenreglement van toepassing.
        </SubArticle>
        <SubArticle number="7.2">
          De aansprakelijkheid van de {getMediatorTypeNaam(mediatorType)} is beperkt tot het bedrag dat in het voorkomende geval door de beroepsaansprakelijkheidsverzekering wordt uitgekeerd, vermeerderd met het eigen risico.
        </SubArticle>
        <SubArticle number="7.3">
          Geschillen die niet door partijen zelf kunnen worden opgelost, worden voorgelegd aan de bevoegde rechtbank.
        </SubArticle>
        <SubArticle number="7.4">
          Op deze overeenkomst is Nederlands recht van toepassing.
        </SubArticle>
      </div>

      {/* Artikel 8 - Kosten - DYNAMISCH OP BASIS VAN TYPE */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        Artikel 8 – Kosten
      </h2>
      <div style={{ marginLeft: '20px' }}>
        {!isFamiliemediator ? (
          // Voor aspirant en lid
          <>
            <SubArticle number="8.1">
              <span data-field="honorariumBedrag">
                Het honorarium van de {getMediatorTypeNaam(mediatorType)} bedraagt € {getValue(data.honorariumBedrag, 'bedrag')} per uur, exclusief {data.honorariumBTW || '21'}% BTW.
              </span>
              {data.reistijdTarief && (
                <span data-field="reistijdTarief"> Het tarief voor reistijd bedraagt € {data.reistijdTarief} per uur.</span>
              )}
              {data.telefoonOverlegTarief && (
                <span data-field="telefoonOverlegTarief"> Het tarief voor telefonisch overleg bedraagt € {data.telefoonOverlegTarief} per uur.</span>
              )}
              <br /><br />
              Daarnaast komen voor rekening van deelnemers alle bijkomende kosten zoals reis- en verblijfkosten, kopieerkosten, telefoonkosten en kosten van inschakeling van derden.
            </SubArticle>
            <SubArticle number="8.2">
              De kosten zijn verschuldigd ook indien de mediation voortijdig wordt beëindigd. <span data-field="facturatieFrequentie">De {getMediatorTypeNaam(mediatorType)} zal {data.facturatieFrequentie || 'periodiek'} declareren.</span> <span data-field="betalingstermijnDagen">Betaling dient te geschieden binnen {data.betalingstermijnDagen || '14'} dagen.</span>
            </SubArticle>
            <SubArticle number="8.3">
              Deelnemers zijn hoofdelijk aansprakelijk voor betaling van het honorarium en de kosten. Onderling dragen zij de kosten in de verhouding: <span data-field="kostenverdelingPartij1">{getValue(data.partij1Naam, 'Deelnemer A')} {data.kostenverdelingPartij1 || '50'}%</span>, <span data-field="kostenverdelingPartij2">{getValue(data.partij2Naam, 'Deelnemer B')} {data.kostenverdelingPartij2 || '50'}%</span>.
            </SubArticle>
          </>
        ) : (
          // Voor familiemediator - ANDERE STRUCTUUR!
          <>
            <SubArticle number="8.1">
              <span data-field="honorariumBedrag">Het honorarium van de vFAS-advocaat familiemediator bedraagt € {getValue(data.honorariumBedrag, 'bedrag')} per uur inclusief 19% BTW.</span> Dit honorarium omvat alle kosten. Aanvullende afgestemde kosten (zoals tolkenkosten) worden apart in rekening gebracht.
            </SubArticle>
            <SubArticle number="8.2">
              <span data-field="gratisPeriode">De vFAS-advocaat familiemediator kan de contacturen voorafgaande aan ondertekening van deze overeenkomst declareren. De eerste {gratisPeriode} uur zijn gratis.</span>
            </SubArticle>
            <SubArticle number="8.3">
              Indien deelnemers deze overeenkomst niet ondertekenen, komen alle tot dat moment gemaakte kosten voor rekening van de vFAS-advocaat familiemediator.
            </SubArticle>
            <SubArticle number="8.4">
              <span data-field="gratisPeriode">Na de eerste {gratisPeriode} uur worden de kosten in rekening gebracht.</span> Deelnemers betalen ieder de helft, tenzij zij een andere verdeling zijn overeengekomen (<span data-field="kostenverdelingPartij1">{getValue(data.partij1Naam, 'Deelnemer A')} {data.kostenverdelingPartij1 || '50'}%</span>, <span data-field="kostenverdelingPartij2">{getValue(data.partij2Naam, 'Deelnemer B')} {data.kostenverdelingPartij2 || '50'}%</span>). Deelnemers ontvangen een urenverantwoording. Ieder draagt zijn eigen kosten (zoals advocaat, accountant).
            </SubArticle>
            <SubArticle number="8.5">
              Mogelijk is een toevoeging van de Raad voor Rechtsbijstand beschikbaar. Zie www.rvr.org voor meer informatie. Voor mediation na rechtspraak: zie www.mediationnaastrechtspraak.nl.
            </SubArticle>
          </>
        )}
      </div>

      {/* Ondertekening */}
      <div style={{ marginTop: '48px', pageBreakBefore: 'auto' }}>
        <p style={{ marginBottom: '16px' }}>
          Aldus overeengekomen en in <strong data-field="aantalExemplaren">{data.aantalExemplaren || '3'}-voud</strong> opgemaakt en ondertekend te <span data-field="ondertekenPlaats">{getValue(data.ondertekenPlaats, 'plaats')}</span> op <span data-field="ondertekenDatum">{data.ondertekenDatum ? formatDateLong(data.ondertekenDatum) : '[datum]'}</span>.
        </p>

        {/* Handtekening tabel met 3 kolommen */}
        <table style={{ width: '100%', marginTop: '48px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {/* Kolom 1: Mediator */}
              <td style={{ width: '33%', verticalAlign: 'top', paddingRight: '16px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{getMediatorTypeNaam(mediatorType)}</p>
                <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: '44px' }}>
                  <p style={{ fontSize: '12px' }}>Mr. {getValue(data.mediatorNaam, 'naam')}</p>
                </div>
              </td>

              {/* Kolom 2: Deelnemer A */}
              <td style={{ width: '33%', verticalAlign: 'top', paddingLeft: '8px', paddingRight: '8px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{getValue(data.partij1Naam, 'Deelnemer A')}</p>
                {data.partij1Vertegenwoordiger && (
                  <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>
                    (vertegenwoordigd door: {data.partij1Vertegenwoordiger})
                  </p>
                )}
                <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: data.partij1Vertegenwoordiger ? '8px' : '44px' }}>
                  <p style={{ fontSize: '12px' }}>&nbsp;</p>
                </div>
              </td>

              {/* Kolom 3: Deelnemer B */}
              <td style={{ width: '33%', verticalAlign: 'top', paddingLeft: '16px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{getValue(data.partij2Naam, 'Deelnemer B')}</p>
                {data.partij2Vertegenwoordiger && (
                  <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>
                    (vertegenwoordigd door: {data.partij2Vertegenwoordiger})
                  </p>
                )}
                <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: data.partij2Vertegenwoordiger ? '8px' : '44px' }}>
                  <p style={{ fontSize: '12px' }}>&nbsp;</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
