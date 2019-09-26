import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { IManageSpecialty } from '../../models/manage-specialty';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'be-invoice',
  templateUrl: './invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent {
  @Input() invoiceId: number;
  @Input() isHoogleraar: boolean;
  @Input() data: IManageSpecialty;

  getInvoiceLink() {
    // data.InvoiceLink has value: "window.open('iDeal/Factuur.aspx?SafeKey=0llZaIoTJsYwTeoX3RIT8QyfYlay7GTqkqJHL6qQ2DOJagZJJvvApwjp2hUdk5o4h3enOWmFi52CPKHeVvzMLjy/OCES+Hwey7bzFZcWrMbUxgiRpszbk3dyYmnkOb0x2yK60L5MVrE3SrG9bJfB/w==','FactuurVenster','left=100,top=50,width=700,height=800,location=0,resizable=1,toolbar=1')",
    // Get the 3 variables (url, name of window, and sizing parameters),
    // separated with single quotes from the window.open function that is received from the backend
    const matcher = this.data.InvoiceLink.match(/'(.[^\']*)'/g);
    // First param is the url, but contains single quotes, so remove those.
    window.open(`/${matcher[0].replace(/\'/g, '')}`, matcher[1], matcher[2]);
  }
}
