export interface IVaardigheid {
  VaardigheidID: number;
  Code: string;
  Omschrijving: string;
  Punten: number;
  MinimumPunten: number;
  IsEnabled: boolean;
  IsVerplicht: boolean;
  Tooltip: string;
}

export interface IVakVraag {
  ThemaID: number;
  CompetentieID: number;
  VraagID: string;
  Titel: string;
  Omschrijving: string;
  Zichtbaar: boolean;
}

export interface ISkills {
  Vaardigheden: IVaardigheid[];
  MinimumPunten: number;
  VakVragen: IVakVraag[];
}
