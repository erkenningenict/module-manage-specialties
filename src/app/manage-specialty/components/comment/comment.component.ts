import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'be-comment',
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnChanges {
  @Input() parentForm: FormGroup;
  @Input() questionId: string;
  @Input() showComments: boolean;
  @Input() enableEditing: boolean;
  @Input() largeCommentArea? = false;

  form: FormGroup = new FormGroup({});

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.initFormModel();
  }

  private initFormModel() {
    this.parentForm.setControl(`Commentaar${this.questionId}Form`, this.form);
    this.form.registerControl(
      `Commentaar${this.questionId}`,
      new FormControl(),
    );

    this.form.controls[`Commentaar${this.questionId}`].setValue('', {
      emitEvent: false,
    });
  }
}
