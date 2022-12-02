import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  IDoelstellingItems,
  IGGItems,
  IManageSpecialty,
} from '../../../manage-specialty/models/manage-specialty';
import {
  parserHelper,
  parseSpecialItems,
  tryParseJSON,
} from '../../../shared/utils';

@Component({
  selector: 'be-print-specialty-content',
  templateUrl: './print-specialty-content.component.html',
  styleUrls: ['./print-specialty-content.component.scss'],
})
export class PrintSpecialtyContentComponent implements OnInit, OnChanges {
  @Input() data: IManageSpecialty;

  doelstelling;
  doelstellingS;
  doelstellingM;
  doelstellingA;
  doelstellingR;
  doelstellingT;
  inhoud;
  geintegreerdeGewasbescherming;
  preventieveMaatregelen;
  teelttechnischeMaatregelen;
  waarschuwingEnAdviesSystemen;
  nietChemischeMogelijkheden;
  chemischeGewasbescherming;
  emissieBeperking;
  actualiteiten: string;
  individueleRelevantie: string;
  werkvorm: string;
  docenten: string;
  promotietekst: string;
  evaluatieWijze: string;
  materiaal: string;
  website: string;

  constructor() {}

  ngOnChanges() {
    // console.log('!DH! changes', this.data);
    if (!this.data.hasOwnProperty('VakID')) {
      return;
    }
    const doelstelling = parseSpecialItems<IDoelstellingItems>(
      this.data,
      'DoelstellingData',
    );

    this.doelstelling = parserHelper(
      doelstelling.Doelstelling,
    ).currentItem.text;
    this.doelstellingS = parserHelper(
      doelstelling.DoelstellingS,
    ).currentItem.text;
    this.doelstellingM = parserHelper(
      doelstelling.DoelstellingM,
    ).currentItem.text;
    this.doelstellingA = parserHelper(
      doelstelling.DoelstellingA,
    ).currentItem.text;
    this.doelstellingR = parserHelper(
      doelstelling.DoelstellingR,
    ).currentItem.text;
    this.doelstellingT = parserHelper(
      doelstelling.DoelstellingT,
    ).currentItem.text;
    this.inhoud = parserHelper(this.data.Inhoud).currentItem.text;
    const gg = parseSpecialItems<IGGItems>(
      this.data,
      'GeintegreerdeGewasbeschermingData',
    );
    this.geintegreerdeGewasbescherming = parserHelper(
      gg.GeintegreerdeGewasbescherming,
    ).currentItem.text;
    this.preventieveMaatregelen = parserHelper(
      gg.PreventieveMaatregelen,
    ).currentItem.text;
    this.teelttechnischeMaatregelen = parserHelper(
      gg.TeelttechnischeMaatregelen,
    ).currentItem.text;
    this.waarschuwingEnAdviesSystemen = parserHelper(
      gg.WaarschuwingEnAdviesSystemen,
    ).currentItem.text;
    this.nietChemischeMogelijkheden = parserHelper(
      gg.NietChemischeMogelijkheden,
    ).currentItem.text;
    this.chemischeGewasbescherming = parserHelper(
      gg.ChemischeGewasbescherming,
    ).currentItem.text;
    this.emissieBeperking = parserHelper(gg.EmissieBeperking).currentItem.text;

    this.actualiteiten = parserHelper(this.data.Actualiteiten).currentItem.text;
    this.individueleRelevantie = parserHelper(
      this.data.IndividueleRelevantie,
    ).currentItem.text;
    const werkvormData = tryParseJSON(this.data.WerkvormData)
      ? JSON.parse(this.data.WerkvormData).Werkvorm
      : this.data.WerkvormData;
    this.werkvorm = Array.isArray(werkvormData)
      ? werkvormData.pop().text
      : werkvormData;
    this.docenten = parserHelper(this.data.Docenten).currentItem.text;
    this.materiaal = parserHelper(this.data.Materiaal).currentItem.text;
    this.evaluatieWijze = parserHelper(
      this.data.EvaluatieWijze,
    ).currentItem.text;
  }

  ngOnInit() {}
}
