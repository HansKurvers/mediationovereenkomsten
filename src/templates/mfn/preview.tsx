// ============================================
// FILE: src/templates/mfn/preview.tsx
// MfN preview component with improved formatting
// ============================================

import React from 'react';
import { formatDateLong } from '../../utils/dateFormat';

interface MfnPreviewProps {
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

// Helper component for sub-articles with bullet points
const SubArticle: React.FC<{ number: string; children: React.ReactNode }> = ({ number, children }) => (
  <div style={{ display: 'flex', marginBottom: '12px', lineHeight: '1.6' }}>
    <div style={{ minWidth: '40px', fontWeight: 'bold' }}>{number}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export const MfnPreview: React.FC<MfnPreviewProps> = ({ data }) => {
  return (
    <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.6', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px' }}>
        Mediationovereenkomst
      </h1>

      {/* Mediator */}
      <div style={{ marginBottom: '24px' }}>
        <p>
          {getValue(data.mediatorNaam, 'naam mediator')}, MfN-registermediator
          {data.mediatorMfnRegistratie && ` (${data.mediatorMfnRegistratie})`}
        </p>
      </div>

      <p style={{ marginBottom: '24px' }}>en de deelnemers:</p>

      {/* Deelnemer 1 */}
      <div style={{ marginBottom: '16px' }}>
        <p>
          <strong>A:</strong> {getValue(data.partij1Naam, 'naam deelnemer 1')}
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

      {/* Deelnemer 2 */}
      <div style={{ marginBottom: '24px' }}>
        <p>
          <strong>B:</strong> {getValue(data.partij2Naam, 'naam deelnemer 2')}
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

      <p style={{ marginBottom: '32px' }}>komen hierbij overeen:</p>

      {/* 1. Globale omschrijving */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        1 Globale omschrijving van de kwestie
      </h2>
      <p style={{ marginBottom: '12px', marginLeft: '20px' }}>
        Deelnemers trachten samen middels mediation tot overeenstemming en afspraken te komen over de navolgende kwestie: {getKwestieText(data.kwestieType, data.kwestieAndersOmschrijving)}.
      </p>
      {data.kwestieOmschrijving && (
        <p style={{ marginBottom: '24px', marginLeft: '20px', fontStyle: 'italic' }}>
          Aanvullende details: {data.kwestieOmschrijving}
        </p>
      )}

      {/* 2. Mediation */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        2 Mediation
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="2.1">
          De deelnemers en de mediator zullen zich inspannen om de in punt 1 genoemde kwestie tussen de deelnemers op te lossen door mediation conform het MfN-Mediationreglement (hierna te noemen het "Reglement") zoals dat luidt op de datum van deze overeenkomst. Het Reglement (waarvan een kopie aan deze overeenkomst is gehecht) maakt integraal deel uit van deze overeenkomst. De deelnemers verklaren een exemplaar van de MfN-Gedragsregels te hebben ontvangen.
        </SubArticle>

        <SubArticle number="2.2">
          De deelnemers verstrekken en de mediator accepteert de opdracht om het communicatie- en onderhandelingsproces te begeleiden een en ander in de zin van het Reglement.
        </SubArticle>

        <SubArticle number="2.3">
          De mediator is verantwoordelijk voor de begeleiding van het proces. De deelnemers zijn zelf verantwoordelijk voor de inhoud van de gevonden oplossing.
        </SubArticle>

        <SubArticle number="2.4">
          De deelnemers en de mediator verbinden zich jegens elkaar tot al hetgeen waartoe zij ingevolge het Reglement gehouden zijn.
        </SubArticle>

        <SubArticle number="2.5">
          De mediation vangt aan op {data.mediationStartdatum ? formatDateLong(data.mediationStartdatum) : '[datum]'}. Vanaf dat moment zijn de bepalingen van het Reglement volledig van toepassing.
        </SubArticle>

        <SubArticle number="2.6">
          Naast het gestelde in het Reglement verbinden de deelnemers zich jegens de mediator en jegens elkaar zich te onthouden van acties of gedragingen die de mediation in ernstige mate bemoeilijken of belemmeren.
        </SubArticle>
      </div>

      {/* 3. Vrijwilligheid */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        3 Vrijwilligheid
      </h2>
      <p style={{ marginBottom: '16px', marginLeft: '20px' }}>
        De mediation vindt plaats op basis van vrijwilligheid. Het staat elk der deelnemers en de mediator vrij om de mediation op elk gewenst moment te beëindigen. Beëindiging geschiedt door een schrijven gericht aan de mediator en de andere deelnemer(s). Dit schrijven kan worden toegelicht tijdens een gezamenlijke (slot)bijeenkomst met de mediator. Het beëindigen van de mediation laat de geheimhoudings- en betalingsverplichtingen van de deelnemers onverlet.
      </p>

      {/* 4. Geheimhouding */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        4 Geheimhouding
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="4.1">
          Mediator en de deelnemers verplichten zich zonder enig voorbehoud tot de geheimhouding zoals omschreven in artikel 7 en 10 van het Reglement.
        </SubArticle>

        <SubArticle number="4.2">
          Deze overeenkomst geldt in samenhang met het Reglement als een bewijsovereenkomst in de zin van de wet, zie art. 7:900 BW jo. art. 153 Rv. Mediator en de deelnemers hebben de bedoeling om daarmee op onderdelen af te wijken van het wettelijk geldende bewijsrecht om daarmee de gewenste vertrouwelijkheid te waarborgen.
        </SubArticle>
      </div>

      {/* 5. Persoonsgegevens */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        5 Persoonsgegevens
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="5.1">
          In het kader van de mediation is het noodzakelijk dat de mediator persoonsgegevens verwerkt die relevant zijn voor de in punt 1 genoemde kwestie, door deze op te nemen in het dossier. Het kan daarbij ook gaan om gevoelige en/of bijzondere persoonsgegevens van deelnemers. Door ondertekening van deze overeenkomst geven deelnemers uitdrukkelijk toestemming aan de mediator om hun persoonsgegevens te verwerken conform de privacyverklaring van de mediator (bijlage bij deze overeenkomst). Deze toestemming is noodzakelijk om de mediation te kunnen starten.
        </SubArticle>
      </div>

      {/* 6. Vertegenwoordiging */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        6 Vertegenwoordiging
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="6.1">
          Natuurlijke personen zijn zelf aanwezig bij de bijeenkomsten. Rechtspersonen worden vertegenwoordigd conform punt 6.2. De persoon die deze overeenkomst tekent zal bij de bijeenkomsten aanwezig zijn.
        </SubArticle>

        <SubArticle number="6.2">
          Elk der deelnemers staat ervoor in dat haar vertegenwoordiger rechtsgeldig bevoegd is om namens haar alle rechtshandelingen te verrichten die in het kader van de mediation noodzakelijk zijn, het aangaan van een overeenkomst als bedoeld in punt 8.1 daaronder begrepen, alsmede dat de vertegenwoordiger zich zal houden aan de in het Reglement genoemde geheimhouding.
        </SubArticle>
      </div>

      {/* 7. Honoraria en kosten */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        7 Honoraria en kosten
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="7.1">
          Het honorarium voor de werkzaamheden van de mediator bedraagt {getValue(data.honorariumBedrag, 'bedrag')} euro per uur, vermeerderd met {data.honorariumBTW || '21'}% wettelijk verschuldigde omzetbelasting.

          {data.mediationActiviteiten && data.mediationActiviteiten.length > 0 && (
            <>
              <br /><br />
              De vergoeding heeft betrekking op de volgende werkzaamheden:
              <ul style={{ marginTop: '8px', marginBottom: '8px', paddingLeft: '20px' }}>
                {data.mediationActiviteiten.map((activiteit: string) => (
                  <li key={activiteit} style={{ marginBottom: '4px' }}>
                    {activiteit === 'anders' && data.mediationActiviteitenAnders
                      ? data.mediationActiviteitenAnders
                      : getActiviteitLabel(activiteit)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {data.activiteitenOnderUurtarief && (
            <>
              <br />
              Overige activiteiten onder het uurtarief: {data.activiteitenOnderUurtarief}.
            </>
          )}

          <br /><br />
          Voorts komen voor rekening van de deelnemers alle overige directe en indirecte kosten van de mediation, zoals eventuele huur van ruimtes, telefoon-, fax- en reiskosten, porti, honoraria en kosten van eventuele bij de mediation door de mediator betrokken derden, vermeerderd met wettelijk verschuldigde omzetbelasting.
        </SubArticle>

        <SubArticle number="7.2">
          Honorarium en kosten bedoeld in punt 7.1 worden door de deelnemers gedragen in de volgende verhouding:<br />
          {getValue(data.partij1Naam, 'deelnemer 1')}: {data.kostenverdelingPartij1 || '50'}% &nbsp;&nbsp; {getValue(data.partij2Naam, 'deelnemer 2')}: {data.kostenverdelingPartij2 || '50'}%
        </SubArticle>

        <SubArticle number="7.3">
          De deelnemers dragen daarnaast ieder de eigen kosten.
        </SubArticle>

        <SubArticle number="7.4">
          De mediator zal {data.facturatieFrequentie || 'periodiek'} factureren. Betaling geschiedt binnen {data.betalingstermijnDagen || '14'} dagen na factuurdatum.
        </SubArticle>
      </div>

      {/* 8. Vastlegging resultaat */}
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>
        8 Vastlegging van het resultaat van de mediation en tussentijdse afspraken
      </h2>
      <div style={{ marginLeft: '20px' }}>
        <SubArticle number="8.1">
          Een in der minne bereikte oplossing van de kwestie zal tussen de deelnemers worden vastgelegd in een daartoe strekkende, door deelnemers ondertekende schriftelijke overeenkomst.
        </SubArticle>

        <SubArticle number="8.2">
          Tijdens de loop van de mediation tussen de deelnemers gemaakte afspraken binden hen alleen voor zover deze schriftelijk tussen hen zijn vastgelegd, door hen zijn ondertekend en daarin uitdrukkelijk is opgenomen dat de afspraken blijven bestaan ook indien de mediation verder niet tot overeenstemming leidt.
        </SubArticle>
      </div>

      {/* Ondertekening */}
      <div style={{ marginTop: '48px', pageBreakBefore: 'auto' }}>
        <p style={{ marginBottom: '16px' }}>
          Aldus overeengekomen en in <strong>{data.aantalExemplaren || '3'}-voud</strong> opgemaakt en ondertekend te {getValue(data.ondertekenPlaats, 'plaats')} op {data.ondertekenDatum ? formatDateLong(data.ondertekenDatum) : '[datum]'}.
        </p>

        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {/* Mediator */}
          <div style={{ flex: 1, minWidth: '150px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Mediator</p>
            {data.mediatorOrganisatie && (
              <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>
                {data.mediatorOrganisatie}
              </p>
            )}
            <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: data.mediatorOrganisatie ? '8px' : '44px' }}>
              <p style={{ fontSize: '12px' }}>{getValue(data.mediatorNaam, 'naam')}</p>
            </div>
          </div>

          {/* Deelnemer 1 */}
          <div style={{ flex: 1, minWidth: '150px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{getValue(data.partij1Naam, 'Deelnemer 1')}</p>
            {data.partij1Vertegenwoordiger && (
              <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>
                (vertegenwoordigd door: {data.partij1Vertegenwoordiger})
              </p>
            )}
            <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: data.partij1Vertegenwoordiger ? '8px' : '44px' }}>
              <p style={{ fontSize: '12px' }}>&nbsp;</p>
            </div>
          </div>

          {/* Deelnemer 2 */}
          <div style={{ flex: 1, minWidth: '150px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{getValue(data.partij2Naam, 'Deelnemer 2')}</p>
            {data.partij2Vertegenwoordiger && (
              <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>
                (vertegenwoordigd door: {data.partij2Vertegenwoordiger})
              </p>
            )}
            <div style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: data.partij2Vertegenwoordiger ? '8px' : '44px' }}>
              <p style={{ fontSize: '12px' }}>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
