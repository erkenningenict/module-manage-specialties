import { ICurrentItem, IHistoryItem } from '../../shared/utils';
import { ValidationErrors } from '@angular/forms';

export interface IManageSpecialty {
  CurrentUserName: string;
  CurrentPersoonID: number;
  VakID: number;
  Afkorting: string;
  Doelgroep: string;
  Titel: string;
  TitelData: string;
  Status: string;
  AanbodCode: string;
  NormVersieID: number;
  DatumAangemaakt: Date;
  VakgroepID: number;
  VakgroepNaam: string;
  VakgroepAdres: string;
  ThemaID: number;
  CompetentieID: number;
  GekozenVaardigheden: IGekozenVaardigheid[];
  GekozenKennisgebieden: number[];
  DoelstellingData: string;
  Inhoud: string;
  GeintegreerdeGewasbeschermingData: string;
  Actualiteiten: string;
  IndividueleRelevantie: string;
  WerkvormData: string;
  Docenten: string;
  Promotietekst: string;
  PromotietekstData: string;
  EvaluatieWijze: string;
  DigitaalAanbod: boolean;
  Materiaal: string;
  Tijdsduur: string;
  Groepsgrootte: number;
  AantalSessies: number;
  KostenPerDeelname: number;
  Website: string;
  Begindatum: Date;
  Einddatum: Date;
  BijlagenData: IBijlagenData[];
  Discussies: IDiscussie[];
  Commentaren: string;
  Beoordeling: IBeoordeling;
  CreateFactuur: boolean;
  FactuurID: number;
  InvoiceLink: string;
  ThemaCompetentieChanged: boolean;
  VaardighedenChanged: boolean;
  KennisgebiedenChanged: boolean;
  BijlagenChanged: boolean;
  IsRector: boolean;
  IsHoogleraar: boolean;
  IsBeoordelaar: boolean;
  IsVakcommissieAG: boolean;
  GewijzigdActie: string;
  GewijzigdDatum: Date;
  Historie: string;
  Thema: string;
  Competentie: string;
  Vaardigheden: string;
  Beoordelaar: string;
  Vakvragen: string;
}

export interface IGekozenVaardigheid {
  VaardigheidID: number;
}

export interface IBijlagenData {
  DocumentID: number;
  Naam: string;
  Lokatie: string;
  Omschrijving: string;
  Status:
    | 0 /* neutral */
    | 1 /* add? */
    | 2 /* wijzigin omschrijving */
    | 3 /* delete */;
  toggleWijzigOmschrijving: boolean;
}

export interface IBijlagenDataExtend extends IBijlagenData {
  visible: boolean;
  originalText: string;
}

export interface IBeoordeling {
  Beoordeling: number;
  PersoonID: number;
  Status: string;
  Rapport: string;
  RapportCijfer: string;
  DatumRapport: Date;
  DatumGepland: Date;
  BeoordelingChanged: boolean;
}

export interface IDiscussie {
  Commentaar: string;
  DatumTijd: Date;
  Bron: string;
  Auteur: string;
}

export interface IGGItems {
  GeintegreerdeGewasbescherming: string;
  PreventieveMaatregelen: string;
  TeelttechnischeMaatregelen: string;
  WaarschuwingEnAdviesSystemen: string;
  NietChemischeMogelijkheden: string;
  ChemischeGewasbescherming: string;
  EmissieBeperking: string;
}

export interface IDoelstellingItems {
  Doelstelling: string;
  DoelstellingS: string;
  DoelstellingM: string;
  DoelstellingA: string;
  DoelstellingR: string;
  DoelstellingT: string;
}

export interface IWerkvormSchema {
  tijd: string;
  docent: string;
  omschrijving: string;
}

export interface ICurrentItemHistoryArray {
  currentItem: ICurrentItem;
  historyItems: IHistoryItem[];
}

export interface IWerkvormSchemaData {
  werkvormData: ICurrentItemHistoryArray;
  werkvormSchema: IWerkvormSchema[];
}

export interface IFormErrors {
  controlName: string;
  errors: ValidationErrors;
}

export interface IHistoryObject {
  changes: string;
  changedFields: string[];
  changedComments: string[];
  date: Date;
  by: string;
}

export interface IUploadFileResponse {
  DocumentID: number;
  Naam: string;
  Lokatie: string;
  Omschrijving: string;
  Status: number;
}
