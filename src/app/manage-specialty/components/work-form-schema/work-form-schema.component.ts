import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IWerkvormSchema } from '../../models/manage-specialty';

@Component({
  selector: 'be-work-form-schema',
  templateUrl: './work-form-schema.component.html',
  styleUrls: ['./work-form-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkFormSchemaComponent implements OnChanges {
  @Input() scheme: IWerkvormSchema[];
  @Input() enableEditing: boolean;
  @Output()
  updateScheme: EventEmitter<IWerkvormSchema[]> = new EventEmitter<
    IWerkvormSchema[]
  >();
  showScheme = false;

  trackByFunction(index, item) {
    return index;
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    this.showScheme = !!(this.scheme && this.scheme.length);
  }

  createScheme() {
    this.showScheme = true;
    this.addPeriod();
  }

  addPeriod() {
    let newPeriod: IWerkvormSchema = {
      tijd: '0:00',
      docent: '',
      omschrijving: 'Introductie',
    };
    if (!(this.scheme && this.scheme.length === 0)) {
      const lastPeriod = this.scheme[this.scheme.length - 1];
      newPeriod = {
        tijd: lastPeriod.tijd,
        docent: lastPeriod.docent,
        omschrijving: '',
      };
    }
    const scheme: IWerkvormSchema[] = [...this.scheme];
    scheme.push(newPeriod);
    this.updateScheme.emit(scheme);
  }

  onMoveItem(event: { index: number; direction: number }) {
    const scheme: IWerkvormSchema[] = [...this.scheme];
    const newIndex = event.index + event.direction;
    if (newIndex > -1 && newIndex < scheme.length) {
      // Remove element form the array
      const removedElement = scheme.splice(event.index, 1)[0];

      // At 'newIndex', remove 0 elements, insert the removed element
      scheme.splice(newIndex, 0, removedElement);
      this.updateScheme.emit(scheme);
    }
  }

  onDeletePeriod(period) {
    const scheme: IWerkvormSchema[] = [...this.scheme];
    const index = scheme.indexOf(period);
    scheme.splice(index, 1);
    this.updateScheme.emit(scheme);
  }

  onChangePeriod(event: { index: number; period: IWerkvormSchema }) {
    const scheme: IWerkvormSchema[] = [...this.scheme];
    scheme[event.index] = event.period;
    this.updateScheme.emit(scheme);
  }
}
