import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'be-question-container',
  templateUrl: './question-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionContainerComponent {
  @Input() questionTitle: string;
  @Input() questionText: string;
  @Input() visible: true;
}
