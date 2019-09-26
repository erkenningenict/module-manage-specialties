import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'be-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() text = '';

  private baseUrl: string = environment.baseUrl;
}
