import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IVakgroep } from '../../models/lists';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'be-organization',
  templateUrl: './organization.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent {
  @Input() parentForm: FormGroup;
  @Input() vakgroepId: number;
  @Input() vakgroepNaam: string;
  @Input() status: string;
  @Input() vakgroepen: IVakgroep[];

  form: FormGroup = new FormGroup({
    aanbieder: new FormControl('', [Validators.required]),
  });

  onAanbiederChange(event, value) {}

  private initFormModel() {
    if (this.status === 'Nieuw') {
      this.form = new FormGroup({
        aanbieder: new FormControl('', [Validators.required]),
      });
    }
  }
}
