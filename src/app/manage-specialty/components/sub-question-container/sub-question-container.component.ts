import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



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
