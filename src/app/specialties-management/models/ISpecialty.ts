export interface ISpecialty {
  VakID: number;
  VakgroepID: number;
  VakgroepNaam: string;
  Code: string;
  Status: string;
  Titel: string;
  MaximumDatum: Date;
  Competentie: string;
  Thema: string;
  DatumAangemaakt: Date;
  RevokeVisible: boolean;
  DeleteVisible: boolean;
  EditVisible: boolean;
  ViewVisible: boolean;
  IsSjabloon: boolean;
  MaximumCursisten: number;
}

export interface ISector {
  KennisgebiedID: number;
  Naam: string;
  Selected: boolean;
}
