import { Component, Input, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ISpecialty } from '../../models/ISpecialty';

@Component({
  selector: 'be-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges {
  @Input() list: ISpecialty[];
  @Input() loading: boolean;

  data: ISpecialty[];
  organizers: SelectItem[] = [];
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
    this.data = specialties;
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
