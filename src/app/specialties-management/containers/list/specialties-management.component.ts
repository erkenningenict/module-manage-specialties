import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSpecialties from '../../store/reducers/index';
import * as fromList from '../../store/reducers/index';
import * as list from '../../store/actions/list';
import { ISpecialty } from '../../models/ISpecialty';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { MessageService } from 'primeng/components/common/messageservice';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'be-specialties-management',
  templateUrl: './specialties-management.component.html',
  styleUrls: ['./specialties-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtiesManagementComponent implements OnInit {
  searchQuery$: Observable<string>;
  specialties$: Observable<ISpecialty[]>;
  list$: Observable<ISpecialty[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<fromSpecialties.State>,
    private messageService: MessageService,
  ) {
    this.searchQuery$ = this.store
      .select(fromSpecialties.getSearchQuery)
      .take(1);
    this.list$ = this.store.select(fromList.getList);
    this.loading$ = this.store.select(fromSpecialties.getListLoading);
    this.error$ = this.store.select(fromSpecialties.getSearchError);
    this.store
      .select(fromSpecialties.getListError)
      .pipe(filter((v) => v !== undefined))
      .subscribe((error: any) => {
        console.log('#DH# error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Fout opgetreden',
          detail: error && error.message ? error.message : 'onbekende fout',
        });
      });
  }

  ngOnInit() {
    this.store.dispatch(new list.Load());
  }

  search(query: string) {
    this.store.dispatch(new list.Search(query));
  }
}
