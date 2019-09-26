import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'be-sub-question-container',
  templateUrl: './sub-question-container.component.html',
  styleUrls: ['./sub-question-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubQuestionContainerComponent {
  @Input() questionTitle: string;
  @Input() questionText: string;
  @Input() visible: true;
}
