export interface IVakgroep {
  VakgroepID: number;
  VakgroepNaam: string;
}

export interface IActualiteit {
  ActualiteitID: number;
  KennisgebiedID: number;
  Kennisgebied: string;
  OnderwerpID: number;
  Onderwerp: string;
  Link: string;
  Omschrijving: string;
}

export interface IThema {
  ThemaID: number;
  Naam: string;
}

export interface ICompetentie {
  CompetentieID: number;
  Naam: string;
}

export interface IKennisgebied {
  KennisgebiedID: number;
  Naam: string;
}

export interface IGeldigeThemaCompetentieCombinatie {
  ThemaID: number;
  CompetentieID: number;
}

export interface IBeoordelaar {
  PersoonID: number;
  BeoordelaarNaam: string;
}

export interface ILists {
  Vakgroepen: IVakgroep[];
  Actualiteiten: IActualiteit[];
  Themas: IThema[];
  Competenties: ICompetentie[];
  Kennisgebieden: IKennisgebied[];
  GeldigeThemaCompetentieCombinaties: IGeldigeThemaCompetentieCombinatie[];
  Beoordelaars: IBeoordelaar[];
}
