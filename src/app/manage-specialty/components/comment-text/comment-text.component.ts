import { Component, Input, OnChanges, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'be-comment-text',
  templateUrl: './comment-text.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTextComponent implements OnInit, OnChanges {
  @Input() questionId: string;
  @Input() showComments: boolean;
  @Input() enableEditing: boolean;
  @Input() largeCommentArea? = false;

  form: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    if (this.form.controls[`commentaar${this.questionId}`]) {
      this.toggleDisabled();
    }
  }

  ngOnInit() {
    this.initFormModel();
  }

  private toggleDisabled() {
    if (this.enableEditing) {
      this.form.controls[`commentaar${this.questionId}`].enable();
    } else {
      this.form.controls[`commentaar${this.questionId}`].disable();
    }
  }

  private initFormModel() {
    this.form.registerControl(
      `commentaar${this.questionId}`,
      new FormControl(undefined),
    );

    this.toggleDisabled();
  }
}
