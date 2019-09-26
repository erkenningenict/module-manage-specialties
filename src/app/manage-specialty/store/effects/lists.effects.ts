import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as lists from '../actions/lists.action';
import { ILists } from '../../models/lists';
import { SpecialtyService } from '../../../services/specialty.service';

@Injectable()
export class ListsEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */

  @Effect()
  fetchLists$: Observable<Action> = this.actions$
    .ofType(lists.LOAD_LISTS)
    // .map(action => action)
    .switchMap(() =>
      this.specialtyService
        .getLists()
        .map((_: ILists) => new lists.LoadListsSuccess(_))
        .catch((error) => of(new lists.LoadListsFail(error))),
    );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
  ) {}
}
