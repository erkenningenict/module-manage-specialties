import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromSpecialties from '../../store/reducers/index';
import * as fromSpecialtyActions from '../../store/actions/specialty';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';
import { filter, takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'be-print-dialog-container',
  templateUrl: './print-dialog-container.component.html',
  styleUrls: ['./print-dialog-container.component.scss'],
})
export class PrintDialogContainerComponent implements OnChanges, OnDestroy {
  @Input() vakId: number;
  @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading: true;
  display = false;
  specialty$: Observable<IManageSpecialty>;
  sectoren$: Observable<string[]>;
  loading$: Observable<boolean>;
  error = false;
  private onDestroy$ = new Subject();

  constructor(
    private store: Store<fromSpecialties.State>,
    private messageService: MessageService,
  ) {
    this.specialty$ = this.store.select(fromSpecialties.getSpecialtyData);
    this.sectoren$ = this.store.select(fromSpecialties.getSectorenData);
    this.loading$ = this.store.select(fromSpecialties.getLoadingSpecialty);
    this.store
      .select(fromSpecialties.getLoadOneError)
      .pipe(filter((v) => v !== undefined), takeUntil(this.onDestroy$))
      .subscribe((error: string) => {
        this.error = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Fout opgetreden',
          detail: error ? error : 'onbekende fout',
        });
      });
  }

  ngOnChanges() {
    if (this.vakId !== undefined) {
      this.display = true;
      this.store.dispatch(new fromSpecialtyActions.LoadOne(this.vakId));
      this.store.dispatch(new fromSpecialtyActions.LoadSectoren(this.vakId));
      this.vakId = undefined;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onShow(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('modal-open');
    this.loading = true;
  }

  onHide(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');
    this.dialogClosed.emit();
    this.loading = true;
    this.display = false;
    this.error = false;
  }

  print() {
    const printContent = document.getElementById('wholeContainer').innerHTML;
    const windowUrl = 'about:blank';
    const uniqueName = new Date();
    const windowName = 'Print' + uniqueName.getTime();
    const printWindow = window.open(
      windowUrl,
      windowName,
      'left=50,top=50,width=1100,height=900',
    );
    const style = `
        <style>
        body {
          box-sizing: border-box;
          font-size: 14px;
        }

        p, div, td {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          color: #333333;
          margin-top: 0;
          box-sizing: border-box;
        }

        .panel-title {
          font-size: 18px;
          font-weight: bold;
          margin: 15px 0 5px 0;
        }
        .table {
          width: 100%;
          max-width: 100%;
          margin-bottom: 10px;
          border-collapse: collapse;
        }

        .table-condensed > thead > tr > th, .table-condensed > tbody > tr > th, .table-condensed > tfoot > tr > th, .table-condensed > thead > tr > td, .table-condensed > tbody > tr > td, .table-condensed > tfoot > tr > td {
          padding: 5px;
          vertical-align: top;
        }

        th, td {
          border: solid #eee 1px !important;
        }

        tr > td:first-child {
          font-weight: bold;
        }

        .alt {
          background-color: #eeeeee;
        }

        h4, .h4 {
          font-size: 18px;
        }

        h5, .h5 {
          font-size: 10px;
        }

        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
          font-family: Arial, Helvetica, sans-serif;
          color: inherit;
        }

        .row {
          margin-left: 0;
          margin-right: 0;
        width: 100%;
        }

        .col-sm-4 {
          width: 33.33333333%;
        }

        .col-sm-12 {
          width: 100%;
        }

        .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
          float: left;
        }

        .col-sm-1, .col-sm-1, .col-md-1, .col-lg-1, .col-sm-2, .col-sm-2, .col-md-2, .col-lg-2, .col-sm-3, .col-sm-3, .col-md-3, .col-lg-3, .col-sm-4, .col-sm-4, .col-md-4, .col-lg-4, .col-sm-5, .col-sm-5, .col-md-5, .col-lg-5, .col-sm-6, .col-sm-6, .col-md-6, .col-lg-6, .col-sm-7, .col-sm-7, .col-md-7, .col-lg-7, .col-sm-8, .col-sm-8, .col-md-8, .col-lg-8, .col-sm-9, .col-sm-9, .col-md-9, .col-lg-9, .col-sm-10, .col-sm-10, .col-md-10, .col-lg-10, .col-sm-11, .col-sm-11, .col-md-11, .col-lg-11, .col-sm-12, .col-sm-12, .col-md-12, .col-lg-12 {
          position: relative;
          min-height: 1px;
          padding-left: 5px;
          padding-right: 5px;
        }

        .col-sm-1, .col-sm-1, .col-md-1, .col-lg-1, .col-sm-2, .col-sm-2, .col-md-2, .col-lg-2, .col-sm-3, .col-sm-3, .col-md-3, .col-lg-3, .col-sm-4, .col-sm-4, .col-md-4, .col-lg-4, .col-sm-5, .col-sm-5, .col-md-5, .col-lg-5, .col-sm-6, .col-sm-6, .col-md-6, .col-lg-6, .col-sm-7, .col-sm-7, .col-md-7, .col-lg-7, .col-sm-8, .col-sm-8, .col-md-8, .col-lg-8, .col-sm-9, .col-sm-9, .col-md-9, .col-lg-9, .col-sm-10, .col-sm-10, .col-md-10, .col-lg-10, .col-sm-11, .col-sm-11, .col-md-11, .col-lg-11, .col-sm-12, .col-sm-12, .col-md-12, .col-lg-12 {
          padding-left: 5px !Important;
          padding-right: 5px !Important;
        }

        .list-group {
          padding-left: 0;
        }

        .list-group-item {
          position: relative;
          display: block;
          padding: 0;
        }

        ul, li {
          height: 100%;
          margin: 0;
          padding: 0;
          background: #000;
        }

        .text-right {
          text-align: right;
        }

        .ng-hide, .clearfix, .btn, .btn-default, .btn-group, .btn-group-xs, .control-label {
          display: none;
        }
    </style>
    `;
    printWindow.document.write(
      `<html><head></head><body onload="window.print()">${style}${printContent}</html>`,
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}
