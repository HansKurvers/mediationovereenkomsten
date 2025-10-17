// ============================================
// FILE: src/templates/adr/preview.tsx
// ADR preview component with comprehensive formatting
// ============================================

import React from 'react';
import { formatDateLong } from '../../utils/dateFormat';

interface AdrPreviewProps {
  data: any;
}

const getValue = (value: string, placeholder?: string): string => {
  return value || (placeholder ? `[${placeholder}]` : '');
};

const getKwestieText = (kwestieType: string, andersOmschrijving?: string): string => {
  const texts = {
    'echtscheiding': 'het regelen van de gevolgen van hun voorgenomen echtscheiding',
    'arbeidsconflict': 'hun werkgerelateerde geschil',
    'burengeschil': 'hun geschil voortvloeiend uit hun burenrelatie',
    'zakelijk': 'het conflict in hun zakelijke relatie',
    'anders': andersOmschrijving || '[specificeer de kwestie]'
  };
  return texts[kwestieType as keyof typeof texts] || texts['echtscheiding'];
};

const getActiviteitLabel = (value: string): string => {
  const labels: { [key: string]: string } = {
    'intake': 'Intake',
    'vooroverleg': 'Vooroverleg',
    'gespreksvoering': 'Gespreksvoering',
    'verslaglegging': 'Verslaglegging',
    'correspondentie': 'Correspondentie',
    'documentanalyse': 'Documentanalyse',
    'conceptovereenkomst': 'Conceptovereenkomst',
    'convenant': 'Convenant',
    'ouderschapsplan': 'Ouderschapsplan',
    'telefonisch_overleg': 'Telefonisch overleg',
    'email_contact': 'E-mailcontact',
    'reistijd': 'Reistijd',
    'administratie': 'Administratie',
    'voorbereiding': 'Voorbereiding',
    'nazorg': 'Nazorg',
    'overleg_derden': 'Overleg derden',
    'bestudering_stukken': 'Bestudering stukken',
    'berekeningen': 'Berekeningen',
    'conflictdiagnose': 'Conflictdiagnose',
    'huur_ruimte': 'Huur ruimte'
  };
  return labels[value] || value;
};

const getRolLabel = (value: string): string => {
  const labels: { [key: string]: string } = {
    'mediator': 'Mediator',
    'conflictcoach': 'Conflictcoach',
    'negotiator': 'Negotiator'
  };
  return labels[value] || value;
};

const getReglementNaam = (value: string): string => {
  const namen: { [key: string]: string } = {
    'PD.002': 'PD.002 - Mediationreglement',
    'PD.003': 'PD.003 - Geschillenreglement',
    'GNG.PD.007': 'GNG.PD.007 - Gecertificeerd Negotiator Geschillen'
  };
  return namen[value] || value;
};

// Helper component for sub-articles with bullet points
const SubArticle: React.FC<{ number: string; children: React.ReactNode }> = ({ number, children }) => (
  <div style={{ display: 'flex', marginBottom: '12px', lineHeight: '1.6' }}>
    <div style={{ minWidth: '40px', fontWeight: 'bold' }}>{number}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export const AdrPreview: React.FC<AdrPreviewProps> = ({ data }) => {
  const mediatorRollen = data.mediatorRollen || ['mediator'];
  const heeftConflictcoach = mediatorRollen.includes('conflictcoach');
  const heeftNegotiator = mediatorRollen.includes('negotiator');
  const rollenTekst = mediatorRollen.map((rol: string) => getRolLabel(rol)).join(', ');

  return (
    <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.6', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px' }}>
        Mediationovereenkomst
      </h1>

      {/* Preambule */}
      <div style={{ marginBottom: '24px' }}>
        <p>
          <strong>De ondergetekenden:</strong>
        </p>
      </div>

      {/* Mediator */}
      <div style={{ marginBottom: '24px' }}>
        <p>
          {getValue(data.mediatorNaam, 'naam mediator')}, ADR-gecertificeerd {rollenTekst}
          {data.mediatorAdrRegistratie && ` (${data.mediatorAdrRegistratie})`}
        </p>
      </div>

      <p style={{ marginBottom: '24px' }}>en</p>

      {/* Deelnemer A */}
      <div style={{ marginBottom: '16px' }}>
        <p>
          <strong>Deelnemer A:</strong> {getValue(data.partij1Naam, 'naam deelnemer A')}
          {data.partij1Type === 'natuurlijk' && data.partij1Geboortedatum && (
            <>, geboren op {formatDateLong(data.partij1Geboortedatum)}</>
          )}
          {data.partij1Type === 'natuurlijk' && data.partij1Geboorteplaats && (
            <> te {data.partij1Geboorteplaats}</>
          )}
          , {data.partij1Type === 'natuurlijk' ? 'wonende' : 'gevestigd'} te {getValue(data.partij1Adres, 'adres')}
        </p>
        {data.partij1Vertegenwoordiger && (
          <p style={{ marginLeft: '20px', fontStyle: 'italic' }}>
            hier vertegenwoordigd door: {data.partij1Vertegenwoordiger}
          </p>
        )}
      </div>

      <p style={{ marginBottom: '16px' }}>en</p>

      {/* Deelnemer B */}
      <div style={{ marginBottom: '24px' }}>
        <p>
          <strong>Deelnemer B:</strong> {getValue(data.partij2Naam, 'naam deelnemer B')}
          {data.partij2Type === 'natuurlijk' && data.partij2Geboortedatum && (
            <>, geboren op {formatDateLong(data.partij2Geboortedatum)}</>
          )}
          {data.partij2Type === 'natuurlijk' && data.partij2Geboorteplaats && (
            <> te {data.partij2Geboorteplaats}</>
          )}
          , {data.partij2Type === 'natuurlijk' ? 'wonende' : 'gevestigd'} te {getValue(data.partij2Adres, 'adres')}
        </p>
        {data.partij2Vertegenwoordiger && (
          <p style={{ marginLeft: '20px', fontStyle: 'italic' }}>
            hier vertegenwoordigd door: {data.partij2Vertegenwoordiger}
          </p>
        )}
      </div>

      <p style={{ marginBottom: '32px' }}>komen het volgende overeen:</p>

      {/* Artikel 1 - Globale omschrijving */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 1 – Globale omschrijving van de kwestie
      </h2>
      <p style={{ marginBottom: '12px', marginLeft: '20px' }}>
        Deelnemers trachten samen middels mediation tot overeenstemming en afspraken te komen over de navolgende kwestie: {getKwestieText(data.kwestieType, data.kwestieAndersOmschrijving)}.
      </p>
      {data.kwestieOmschrijving && (
        <p style={{ marginBottom: '24px', marginLeft: '20px', fontStyle: 'italic' }}>
          Aanvullende toelichting: {data.kwestieOmschrijving}
        </p>
      )}

      {/* Artikel 2 - Aanvang mediation */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 2 – Aanvang mediation
      </h2>
      <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
        De mediation vangt aan op {data.mediationStartdatum ? formatDateLong(data.mediationStartdatum) : '[datum]'}.
      </p>

      {/* Artikel 3 - Opdracht */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 3 – Opdracht
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <p style={{ marginBottom: '12px' }}>
          Deelnemers verstrekken en de {rollenTekst.toLowerCase()} accepteert de opdracht om het proces te begeleiden.
        </p>
        {heeftConflictcoach && (
          <p style={{ marginBottom: '12px' }}>
            In de hoedanigheid van conflictcoach richt de begeleiding zich op het ondersteunen van één deelnemer bij het hanteren en oplossen van conflicten.
          </p>
        )}
        {heeftNegotiator && (
          <p style={{ marginBottom: '12px' }}>
            In de hoedanigheid van negotiator ondersteunt de begeleider deelnemers bij het onderhandelen over een oplossing.
          </p>
        )}
      </div>

      {/* Artikel 4 - ADR-Mediationreglement */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 4 – ADR-Mediationreglement
      </h2>
      <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
        Deelnemers en de mediator verbinden zich jegens elkaar tot al hetgeen waartoe zij ingevolge het {getReglementNaam(data.adrReglement || 'PD.002')} gehouden zijn. Dit reglement maakt integraal onderdeel uit van deze overeenkomst.
      </p>

      {/* Artikel 5 - Vrijwilligheid */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 5 – Vrijwilligheid
      </h2>
      <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
        De mediation vindt plaats op basis van vrijwilligheid. Het staat elk van deelnemers en de mediator vrij om de mediation op elk gewenst moment te beëindigen. Beëindiging geschiedt door een schrijven gericht aan de mediator en de andere deelnemer. Het beëindigen van de mediation laat de geheimhoudings- en betalingsverplichtingen van deelnemers onverlet.
      </p>

      {/* Artikel 6 - Geheimhouding en verschoningsrecht */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel 6 – Geheimhouding en verschoningsrecht
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="6.1">
          Mediator en deelnemers verplichten zich zonder enig voorbehoud tot geheimhouding zoals omschreven in het ADR-reglement.
        </SubArticle>
        <SubArticle number="6.2">
          De mediator heeft een wettelijk verschoningsrecht. Deelnemers verklaren hierbij uitdrukkelijk dat zij zich jegens elkaar en jegens derden beroepen op geheimhouding ten aanzien van hetgeen tijdens de mediation wordt besproken.
        </SubArticle>
        <SubArticle number="6.3">
          Deze overeenkomst geldt als bewijsovereenkomst in de zin van artikel 7:900 BW jo. artikel 153 Rv, waarmee deelnemers afwijken van het wettelijk bewijsrecht om de gewenste vertrouwelijkheid te waarborgen.
        </SubArticle>
      </div>

      {/* Artikel 7 - Meldcode (indien van toepassing) */}
      {data.meldcodeHuiselijkGeweld && (
        <>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
            Artikel 7 – Meldcode huiselijk geweld en kindermishandeling
          </h2>
          <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
            De mediator is gebonden aan de Meldcode huiselijk geweld en kindermishandeling. Bij signalen van huiselijk geweld of kindermishandeling zal de mediator conform deze meldcode handelen. Dit kan betekenen dat de geheimhouding in bepaalde gevallen doorbroken moet worden in het belang van de veiligheid.
          </p>
        </>
      )}

      {/* Artikel 8 - Opnameverbod (indien van toepassing) */}
      {data.opnameverbod && (
        <>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
            Artikel {data.meldcodeHuiselijkGeweld ? '8' : '7'} – Verbod op opnames
          </h2>
          <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
            Het is deelnemers niet toegestaan om tijdens de mediation audio- en/of video-opnames te maken, tenzij alle betrokkenen hier vooraf schriftelijk mee hebben ingestemd.
          </p>
        </>
      )}

      {/* Artikel 9 - Vertegenwoordiging en advocaten */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel {data.meldcodeHuiselijkGeweld && data.opnameverbod ? '9' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '8' : '7'} – Vertegenwoordiging en advocaten
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number={(data.meldcodeHuiselijkGeweld && data.opnameverbod ? '9' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '8' : '7') + '.1'}>
          Natuurlijke personen zijn zelf aanwezig bij de mediationbijeenkomsten. Rechtspersonen worden vertegenwoordigd door een bevoegd persoon.
        </SubArticle>
        <SubArticle number={(data.meldcodeHuiselijkGeweld && data.opnameverbod ? '9' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '8' : '7') + '.2'}>
          Deelnemers kunnen zich laten bijstaan door een advocaat of andere adviseur. Deze personen zijn eveneens gebonden aan de geheimhouding als bedoeld in artikel 6.
        </SubArticle>
      </div>

      {/* Artikel 10 - Honoraria en kosten */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel {data.meldcodeHuiselijkGeweld && data.opnameverbod ? '10' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '9' : '8'} – Honoraria en kosten
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Tarieven:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Mediation: {getValue(data.honorariumBedrag, 'bedrag')} euro per uur</li>
            {heeftConflictcoach && data.conflictcoachTarief && (
              <li>Conflictcoaching: {data.conflictcoachTarief} euro per uur</li>
            )}
            {heeftNegotiator && data.negotiatorTarief && (
              <li>Negotiation: {data.negotiatorTarief} euro per uur</li>
            )}
          </ul>
          <p>Alle bedragen zijn exclusief {data.honorariumBTW || '21'}% BTW.</p>
        </div>

        {data.mediationActiviteiten && data.mediationActiviteiten.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>De vergoeding heeft betrekking op:</p>
            <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
              {data.mediationActiviteiten.map((activiteit: string) => (
                <li key={activiteit} style={{ marginBottom: '4px' }}>
                  {activiteit === 'anders' && data.mediationActiviteitenAnders
                    ? data.mediationActiviteitenAnders
                    : getActiviteitLabel(activiteit)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginBottom: '12px' }}>
          Voorts komen voor rekening van deelnemers alle overige directe en indirecte kosten van de mediation, zoals eventuele huur van ruimtes, telefoon-, reis- en portokosten, honoraria en kosten van eventuele bij de mediation betrokken derden, vermeerderd met wettelijk verschuldigde omzetbelasting.
        </p>

        <p style={{ marginBottom: '12px' }}>
          <strong>Kostenverdeling:</strong><br />
          {getValue(data.partij1Naam, 'Deelnemer A')}: {data.kostenverdelingPartij1 || '50'}%<br />
          {getValue(data.partij2Naam, 'Deelnemer B')}: {data.kostenverdelingPartij2 || '50'}%
        </p>

        <p style={{ marginBottom: '12px' }}>
          De mediator zal {data.facturatieFrequentie || 'periodiek'} factureren. Betaling geschiedt binnen {data.betalingstermijnDagen || '14'} dagen na factuurdatum.
        </p>
      </div>

      {/* Artikel 11 - Subsidie (indien van toepassing) */}
      {data.subsidieMogelijk === 'ja' && (
        <>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
            Artikel {data.meldcodeHuiselijkGeweld && data.opnameverbod ? '11' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '10' : '9'} – Subsidie en toevoeging
          </h2>
          <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
            De mediation wordt (gedeeltelijk) gefinancierd via subsidie/toevoeging.
            {data.subsidieBijToevoeging && (
              <> Het toevoegingsnummer is: <strong>{data.subsidieBijToevoeging}</strong>.</>
            )}
          </p>
        </>
      )}

      {/* Artikel 12 - Persoonsgegevens (AVG) */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel {
          data.subsidieMogelijk === 'ja'
            ? (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '12' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '11' : '10')
            : (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '11' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '10' : '9')
        } – Persoonsgegevens (AVG)
      </h2>
      <p style={{ marginBottom: '24px', marginLeft: '20px' }}>
        In het kader van de mediation is het noodzakelijk dat de mediator persoonsgegevens verwerkt die relevant zijn voor de in artikel 1 genoemde kwestie. Het kan daarbij ook gaan om gevoelige en/of bijzondere persoonsgegevens van deelnemers. Door ondertekening van deze overeenkomst geven deelnemers uitdrukkelijk toestemming aan de mediator om hun persoonsgegevens te verwerken conform de privacyverklaring van de mediator. Deze toestemming is noodzakelijk om de mediation te kunnen starten.
      </p>

      {/* Artikel 13 - Vastlegging resultaat */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', textDecoration: 'underline' }}>
        Artikel {
          data.subsidieMogelijk === 'ja'
            ? (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '13' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '12' : '11')
            : (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '12' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '11' : '10')
        } – Vastlegging van het resultaat
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <p style={{ marginBottom: '12px' }}>
          Een in der minne bereikte oplossing van de kwestie zal tussen deelnemers worden vastgelegd in een daartoe strekkende, door deelnemers ondertekende schriftelijke overeenkomst.
        </p>
        <p style={{ marginBottom: '12px' }}>
          Tijdens de loop van de mediation tussen deelnemers gemaakte afspraken binden hen alleen voor zover deze schriftelijk tussen hen zijn vastgelegd, door hen zijn ondertekend en daarin uitdrukkelijk is opgenomen dat de afspraken blijven bestaan ook indien de mediation verder niet tot overeenstemming leidt.
        </p>
      </div>

      {/* Ondertekening */}
      <div style={{ marginTop: '48px', pageBreakBefore: 'auto' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', textDecoration: 'underline' }}>
          Artikel {
            data.subsidieMogelijk === 'ja'
              ? (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '14' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '13' : '12')
              : (data.meldcodeHuiselijkGeweld && data.opnameverbod ? '13' : data.meldcodeHuiselijkGeweld || data.opnameverbod ? '12' : '11')
          } – Ondertekening
        </h2>
        <p style={{ marginBottom: '16px', marginLeft: '20px' }}>
          Aldus overeengekomen en in <strong>{data.aantalExemplaren || '3'}-voud</strong> opgemaakt en ondertekend te {getValue(data.ondertekenPlaats, 'plaats')} op {data.ondertekenDatum ? formatDateLong(data.ondertekenDatum) : '[datum]'}.
        </p>

        {/* Handtekening tabel met 3 kolommen */}
        <table style={{ width: '100%', marginTop: '48px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {/* Kolom 1: Mediator */}
              <td style={{ width: '33%', verticalAlign: 'top', paddingRight: '16px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Mediator</p>
                <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: '44px' }}>
                  <p style={{ fontSize: '12px' }}>{getValue(data.mediatorNaam, 'naam')}</p>
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
