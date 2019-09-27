import { Component, Input, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ISpecialty } from '../../models/ISpecialty';

@Component({
  selector: 'be-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() list: ISpecialty[];
  @Input() loading: boolean;

  data: ISpecialty[];
  organizers: SelectItem[] = [];
  statusList: SelectItem[] = [];
  tList: SelectItem[] = [];
  cList: SelectItem[] = [];
  vakIdPrint: number;
  vakIdAction: number;
  titel: string;
  isDelete: boolean;

  constructor() {
    // TODO Delete (for testing only)
    // this.openPrintDialog(23519);
  }

  ngOnChanges() {
    this.setSpecialties(this.list);
  }

  setSpecialties(specialties: ISpecialty[]) {
    this.data = [...specialties];
    specialties.map((specialty: ISpecialty) => {
      // this.data = data;
      // create filter for organizers
      const organizer: { label: string; value: string } = {
        label: specialty.VakgroepNaam,
        value: specialty.VakgroepNaam,
      };
      if (
        !this.organizers.find(
          (item: SelectItem) => item.value === organizer.value,
        )
      ) {
        this.organizers.push(organizer);
      }
      const status: { label: string; value: string } = {
        label: specialty.Status,
        value: specialty.Status,
      };
      if (
        !this.statusList.find((item: SelectItem) => item.value === status.value)
      ) {
        this.statusList.push(status);
      }
      const thema: { label: string; value: string } = {
        label: specialty.Thema,
        value: specialty.Thema,
      };
      if (!this.tList.find((item: SelectItem) => item.value === thema.value)) {
        this.tList.push(thema);
      }
      const competentie: { label: string; value: string } = {
        label: specialty.Competentie,
        value: specialty.Competentie,
      };
      if (
        !this.cList.find((item: SelectItem) => item.value === competentie.value)
      ) {
        this.cList.push(competentie);
      }
    });
  }

  openPrintDialog(event) {
    this.vakIdPrint = event;
  }

  openActionDialog(vakId: number, titel: string, isDelete: boolean) {
    this.vakIdAction = vakId;
    this.titel = titel;
    this.isDelete = isDelete;
  }

  onDialogClosed(hasChanges: boolean) {
    this.vakIdPrint = undefined;
    this.vakIdAction = undefined;
  }
}
