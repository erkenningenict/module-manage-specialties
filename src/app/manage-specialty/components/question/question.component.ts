import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { ParserService } from '../../../services/parser.service';

@Component({
  selector: 'be-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() labelText: string;
  @Input() controlName: string;
  @Input() data: string;
  @Input() showComments: boolean;
  @Input() enableEditing: boolean;
  @Input() maxLength = 2000;
  @Input() tabIndex: number;
  @Input() currentTabIndex: number;
  error: string;
  success: boolean;

  requiredItem: boolean;
  showNrOfCharacters = true;
  form: FormGroup = new FormGroup({});

  constructor(public parserService: ParserService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.initFormModel();
    if (simpleChanges && simpleChanges.currentTabIndex) {
      // console.log('!DH! ');
    } else {
      // console.log('!DH! changes called', this.controlName);
      // if (this.tabIndex === this.currentTabIndex) {
      //   console.log('!DH! question tab visible');
      // }
      if (this.enableEditing) {
        this.form.controls[this.controlName].enable();
      } else {
        this.form.controls[this.controlName].disable();
      }
    }
  }

  ngOnInit() {
    this.parentForm.setControl(`Data${this.controlName}Form`, this.form);
    // this.form.valueChanges.debounceTime(200).subscribe((value) => {
    //   console.log('!DH! ', this.controlName, value);
    // });
  }

  private initFormModel() {
    this.form.registerControl(
      this.controlName,
      new FormControl(undefined, [Validators.required]),
    );

    const value = this.parserService.parseHistoryItems(this.data);
    this.form.controls[this.controlName].setValue(value.currentItem.text, {
      emitEvent: false,
    });
  }
}
