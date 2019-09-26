import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { IActualiteit } from '../../models/lists';

@Component({
  selector: 'be-actualities',
  templateUrl: './actualities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActualitiesComponent implements OnChanges {
  @Input() relevanteActualiteiten: IActualiteit[];
  onderwerpen: string[];

  ngOnChanges() {
    this.onderwerpen = this.relevanteActualiteiten
      .map((alle: IActualiteit) => alle.Onderwerp)
      .filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos;
      });
  }
}
