import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';


import { IHistoryObject } from '../../models/manage-specialty';

@Component({
  selector: 'be-change-log',
  templateUrl: './change-log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLogComponent implements OnChanges {
  @Input() changeLog: IHistoryObject[] = [];

  currentChangeLogItems: IHistoryObject[] = [];
  currentPage = 0;
  pageSize = 3;

  ngOnChanges() {
    this.currentChangeLogItems = this.changeLog.slice(
      this.currentPage,
      this.pageSize,
    );
  }

  setPage(newPage: number) {
    this.currentPage = this.currentPage + newPage;
    this.currentChangeLogItems = this.changeLog.slice(
      this.currentPage * this.pageSize,
      this.currentPage * this.pageSize + this.pageSize,
    );
  }

  numberOfPages(): number {
    return Math.ceil(this.changeLog.length / this.pageSize);
  }
}
