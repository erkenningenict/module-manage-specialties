import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';

@Component({
  selector: 'be-print-bijlagen',
  templateUrl: './print-bijlagen.component.html',
})
export class PrintBijlagenComponent implements OnInit, OnChanges {
  @Input() data: IManageSpecialty;

  bijlagen: {
    DocumentID: number;
    Naam: string;
    Lokatie: string;
    Omschrijving: string;
    Status: number;
  }[] = [];
  constructor() {}

  ngOnChanges() {
    this.processBijlagen();
  }

  ngOnInit() {}
  processBijlagen() {
    if (!this.data || !this.data.BijlagenData) {
      return;
    }

    this.bijlagen = this.data.BijlagenData;
  }
}
