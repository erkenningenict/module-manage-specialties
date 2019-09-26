import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'be-question-value',
  templateUrl: './question-value.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionValueComponent implements OnInit, OnChanges {
  @Input() labelText: string;
  @Input() controlName: string;
  @Input() data: string;
  @Input() showComments: boolean;
  @Input() enableEditing: boolean;
  @Input() maxLength = 2000;
  @Input() tabIndex: number;
  @Input() currentTabIndex: number;
  @Input() visible = true;
  error: string;

  requiredItem: boolean;
  showNrOfCharacters = true;
  form = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.form.controls[this.controlName]) {
      this.toggleDisabled();
    }
  }

  ngOnInit() {
    this.initFormModel();
    this.toggleDisabled();
  }

  private toggleDisabled() {
    if (this.enableEditing && this.visible) {
      this.form.controls[this.controlName].enable();
    } else {
      this.form.controls[this.controlName].disable();
    }
  }
  private initFormModel() {
    this.form.registerControl(
      this.controlName,
      new FormControl(undefined, [Validators.required]),
    );
  }
}
