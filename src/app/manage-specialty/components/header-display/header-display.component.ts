import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IManageSpecialty } from '../../models/manage-specialty';

@Component({
  selector: 'be-header-display',
  templateUrl: './header-display.component.html',
  styleUrls: ['./header-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDisplayComponent {
  @Input() specialty: IManageSpecialty;
}
