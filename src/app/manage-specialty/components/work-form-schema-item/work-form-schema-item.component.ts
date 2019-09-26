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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'be-work-form-schema-item',
  templateUrl: './work-form-schema-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkFormSchemaItemComponent implements OnChanges {
  @Input() period: IWerkvormSchema;
  @Input() index: number;
  @Input() periodCount: number;
  @Input() enableEditing: boolean;
  @Output()
  moveItem: EventEmitter<{
    index: number;
    direction: number;
  }> = new EventEmitter<{ index: number; direction: number }>();
  @Output()
  deletePeriod: EventEmitter<IWerkvormSchema> = new EventEmitter<
    IWerkvormSchema
  >();
  @Output()
  changePeriod: EventEmitter<{
    index: number;
    period: IWerkvormSchema;
  }> = new EventEmitter<{ index: number; period: IWerkvormSchema }>();

  form: FormGroup;

  ngOnChanges() {
    this.init();
  }

  init() {
    this.form = new FormGroup({
      tijd: new FormControl({
        value: this.period.tijd,
        disabled: !this.enableEditing,
      }),
      docent: new FormControl({
        value: this.period.docent,
        disabled: !this.enableEditing,
      }),
      omschrijving: new FormControl({
        value: this.period.omschrijving,
        disabled: !this.enableEditing,
      }),
    });
    this.form.valueChanges.subscribe((data: any) => {
      this.changePeriod.emit({ index: this.index, period: data });
    });
  }

  move(upDownIndex: number) {
    this.moveItem.emit({
      index: this.index,
      direction: upDownIndex,
    });
  }
}
