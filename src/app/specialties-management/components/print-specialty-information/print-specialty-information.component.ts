import { Component, Input } from '@angular/core';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';

@Component({
  selector: 'be-print-specialty-information',
  templateUrl: './print-specialty-information.component.html',
})
export class PrintSpecialtyInformationComponent {
  @Input() data: IManageSpecialty;
  @Input() sectoren: IManageSpecialty;
}
