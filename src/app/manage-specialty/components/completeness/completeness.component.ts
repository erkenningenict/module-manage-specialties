import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'be-completeness',
  templateUrl: './completeness.component.html',
  styleUrls: ['./completeness.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletenessComponent implements OnInit, OnChanges {
  @Input() allControls: any[] = [];
  @Input() invalidControls: string[] = [];
  @Input() loaded = false;
  @Input() forJudgement = false;
  @Input() nrOfControls = 0;

  invalidControlCollection: string[] = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.invalidControlCollection = this.invalidControls;
    // if (this.allControls) {
    //   const keys = Object.keys(this.allControls);
    //   this.nrOfControls = keys.length;
    //   keys.map((key: any) => {
    //     if (
    //       (this.allControls[key].status &&
    //         this.allControls[key].status === 'INVALID') ||
    //       (this.allControls[key].status !== 'DISABLED' &&
    //         this.allControls[key].value === '')
    //     ) {
    //       const nice = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    //       this.invalidControlCollection.push(nice.toLowerCase());
    //     }
    //   });
    // }
  }

  get getValueOfProgress(): number {
    return (
      (this.nrOfControls - this.invalidControlCollection.length) /
      this.nrOfControls *
      100
    );
  }
}
