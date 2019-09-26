import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IKennisgebied } from '../../models/lists';
import { FormControl, FormGroup } from '@angular/forms';
import { trueValidator } from '../../../shared/validators/trueValidator';

@Component({
  selector: 'be-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorsComponent implements OnInit, OnChanges {
  @Input() enableEditing: boolean;
  @Input() kennisgebieden: IKennisgebied[];
  @Input() gekozenKennisgebieden: number[];
  @Output()
  kennisgebiedChecked: EventEmitter<{
    kennisgebiedId: number;
    checked: boolean;
  }> = new EventEmitter<{ kennisgebiedId: number; checked: boolean }>();
  form: FormGroup = new FormGroup({});
  constructor() {}

  minimaalAantalSectorenGeselecteerd = false;

  ngOnInit() {
    this.form = new FormGroup({
      sectors: new FormControl(false, [trueValidator]),
    });
  }

  ngOnChanges() {
    if (this.gekozenKennisgebieden) {
      this.minimaalAantalSectorenGeselecteerd =
        this.gekozenKennisgebieden.length === 0;
    }
  }

  isSelected(kennisgebied: IKennisgebied): boolean {
    return (
      this.gekozenKennisgebieden &&
      this.gekozenKennisgebieden.indexOf(kennisgebied.KennisgebiedID) >= 0
    );
  }

  kennisgebiedSelected($event: any, kennisgebied: IKennisgebied) {
    this.kennisgebiedChecked.emit({
      kennisgebiedId: kennisgebied.KennisgebiedID,
      checked: $event.target.checked,
    });
  }
}
