import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as list from '../actions/list';
import { ISpecialty } from '../../models/ISpecialty';
import { SpecialtyService } from '../../../services/specialty.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, skip, debounceTime, map } from 'rxjs/operators';

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(list.LOAD),
    switchMap(() =>
      this.specialtyService
        .getVakken('')
        .map((specialties: ISpecialty[]) => new list.LoadSuccess(specialties))
        .catch((error) => of(new list.LoadFail(error))),
    ),
  );

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<list.Search>(list.SEARCH),
    debounceTime(300),
    map((action) => action.payload),
    switchMap((query) => {
      // if (query === '') {
      //   return empty();
      // }

      const nextSearch$ = this.actions$.pipe(ofType(list.SEARCH), skip(1));

      return this.specialtyService
        .getVakken(query)
        .takeUntil(nextSearch$)
        .map((specialties: ISpecialty[]) => new list.LoadSuccess(specialties))
        .catch((err) => of(new list.LoadFail(err)));
    }),
  );

  @Effect()
  deleteSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType(list.DELETE_SPECIALTY),
    map((action: list.DeleteSpecialty) => action.payload),
    switchMap((vakId) =>
      this.specialtyService
        .deleteVak(vakId)
        .switchMap(() => [
          new list.Load(),
          new list.DeleteSpecialtySuccess('test'),
        ])
        .catch((error: HttpErrorResponse) => {
          return of(
            new list.DeleteSpecialtyFail(
              error.error ? error.error.error : error.error,
            ),
          );
        }),
    ),
  );

  @Effect()
  revokeSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType(list.REVOKE_SPECIALTY),
    map((action: list.RevokeSpecialty) => action.payload),
    switchMap((vakId) =>
      this.specialtyService
        .revokeVak(vakId)
        .switchMap(() => [new list.Load(), new list.RevokeSpecialtySuccess()])
        .catch((error: HttpErrorResponse) =>
          of(
            new list.RevokeSpecialtyFail(
              error.error ? error.error.error : error.error,
            ),
          ),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
  ) {}
}
