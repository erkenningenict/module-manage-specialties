import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IManageSpecialty } from '../../models/manage-specialty';

@Component({
  selector: 'be-title-display',
  templateUrl: './title-display.component.html',
  styleUrls: ['./title-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDisplayComponent {
  @Input() titel: IManageSpecialty;
}
