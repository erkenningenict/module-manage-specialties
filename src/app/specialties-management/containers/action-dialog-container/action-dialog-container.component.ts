import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromSpecialties from '../../store/reducers/index';
import * as fromListActions from '../../store/actions/list';
import { ISpecialty } from '../../models/ISpecialty';
import { Subject } from 'rxjs/Subject';
import { MessageService } from 'primeng/components/common/messageservice';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'be-action-dialog-container',
  templateUrl: './action-dialog-container.component.html',
  styleUrls: ['./action-dialog-container.component.scss'],
})
export class ActionDialogContainerComponent implements OnChanges, OnDestroy {
  @Input() vakId: number;
  @Input() isDelete: boolean;
  @Input() titel: string;
  @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  display = false;
  actionLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  private onDestroy$ = new Subject();

  constructor(
    private store: Store<ISpecialty>,
    private messageService: MessageService,
  ) {
    this.actionLoading$ = this.store.select(fromSpecialties.getActionLoading);
    this.store
      .select(fromSpecialties.getActionError)
      .pipe(filter((v) => v !== undefined))
      .takeUntil(this.onDestroy$)
      .subscribe((error: string) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fout opgetreden',
          detail: error ? error : 'onbekende fout',
        });
      });
    this.store
      .select(fromSpecialties.getActionCompleted)
      .takeUntil(this.onDestroy$)
      .subscribe((completed: boolean) => {
        if (!!completed) {
          this.display = false;
          this.vakId = undefined;
        }
      });
  }

  ngOnChanges() {
    if (this.vakId !== undefined) {
      this.display = true;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  doAction() {
    if (this.isDelete) {
      // Delete
      this.store.dispatch(
        new fromListActions.DeleteSpecialty(this.vakId.toString()),
      );
    } else {
      // Revoke
      this.store.dispatch(
        new fromListActions.RevokeSpecialty(this.vakId.toString()),
      );
    }
  }

  onShow(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('modal-open');
  }

  onHide(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');
    this.dialogClosed.emit();
    this.display = false;
  }
}
