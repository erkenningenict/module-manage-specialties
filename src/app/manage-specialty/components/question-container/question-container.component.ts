import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



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
