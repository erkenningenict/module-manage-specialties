import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IThema } from '../../models/lists';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'be-theme',
  templateUrl: './theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent implements OnChanges {
  @Input() selectedThemaId: number;
  @Input() themas: IThema[];
  @Input() enableEditing: boolean;
  @Output() themaChange = new EventEmitter<IThema>();
  form: FormGroup = new FormGroup({});

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      simpleChanges.selectedThemaId &&
      simpleChanges.selectedThemaId.currentValue &&
      simpleChanges.selectedThemaId.currentValue !== {}
    ) {
    }
    this.initFormModel();
  }

  private initFormModel() {
    const selectedThema = this.themas.find(
      (t) => t.ThemaID === this.selectedThemaId,
    );
    this.form = new FormGroup({
      thema: new FormControl({
        value: selectedThema,
        disabled: !this.enableEditing,
      }),
    });

    this.form
      .get('thema')
      .valueChanges.pipe()
      .subscribe((value) => {
        this.themaChange.emit(value);
      });
  }
}
