import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICompetentie } from '../../models/lists';

@Component({
  selector: 'be-competence',
  templateUrl: './competence.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetenceComponent implements OnChanges {
  @Input() selectedCompetentieId: number;
  @Input() competenties: ICompetentie[];
  @Input() enableEditing: boolean;
  @Output() competentieChange = new EventEmitter<ICompetentie>();
  form: FormGroup = new FormGroup({ competentie: new FormControl() });

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      simpleChanges.competenties &&
      simpleChanges.competenties.currentValue &&
      simpleChanges.competenties.currentValue !== {} &&
      simpleChanges.competenties.currentValue.length
    ) {
      this.initFormModel();
    }
  }

  private initFormModel() {
    const selectedCompetentie: ICompetentie = this.competenties.find(
      (c) => c.CompetentieID === this.selectedCompetentieId,
    );
    this.form = new FormGroup({
      competentie: new FormControl({
        value: selectedCompetentie,
        disabled: !this.enableEditing,
      }),
    });

    this.form
      .get('competentie')
      .valueChanges.pipe()
      .subscribe((value) => {
        this.competentieChange.emit(value);
      });
  }
}
