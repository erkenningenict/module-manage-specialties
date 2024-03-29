import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as lists from '../actions/lists.action';
import { ILists } from '../../models/lists';
import { SpecialtyService } from '../../../services/specialty.service';
import { switchMap, map, catchError } from 'rxjs/operators';

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
  fetchLists$: Observable<Action> = this.actions$.pipe(
    ofType(lists.LOAD_LISTS),
    switchMap(() =>
      this.specialtyService
        .getLists()
        .pipe(
          map((_: ILists) => new lists.LoadListsSuccess(_)),
          catchError((error: any) => of(new lists.LoadListsFail(error))),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
  ) {}
}
