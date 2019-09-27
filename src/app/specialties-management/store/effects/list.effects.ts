import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as list from '../actions/list';
import { ISpecialty } from '../../models/ISpecialty';
import { SpecialtyService } from '../../../services/specialty.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  switchMap,
  skip,
  debounceTime,
  map,
  catchError,
  takeUntil,
} from 'rxjs/operators';

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(list.LOAD),
    switchMap(() =>
      this.specialtyService
        .getVakken('')
        .pipe(
          map((specialties: ISpecialty[]) => new list.LoadSuccess(specialties)),
          catchError((error) => of(new list.LoadFail(error))),
        ),
    ),
  );

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<list.Search>(list.SEARCH),
    debounceTime(300),
    map((action) => action.payload),
    switchMap((query) => {
      const nextSearch$ = this.actions$.pipe(ofType(list.SEARCH), skip(1));

      return this.specialtyService
        .getVakken(query)
        .pipe(
          takeUntil(nextSearch$),
          map((specialties: ISpecialty[]) => new list.LoadSuccess(specialties)),
          catchError((err) => of(new list.LoadFail(err))),
        );
    }),
  );

  @Effect()
  deleteSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType(list.DELETE_SPECIALTY),
    map((action: list.DeleteSpecialty) => action.payload),
    switchMap((vakId) =>
      this.specialtyService.deleteVak(vakId).pipe(
        switchMap(() => [
          new list.Load(),
          new list.DeleteSpecialtySuccess('test'),
        ]),
        catchError((error: HttpErrorResponse) => {
          return of(
            new list.DeleteSpecialtyFail(
              error.error ? error.error.error : error.error,
            ),
          );
        }),
      ),
    ),
  );

  @Effect()
  revokeSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType(list.REVOKE_SPECIALTY),
    map((action: list.RevokeSpecialty) => action.payload),
    switchMap((vakId) =>
      this.specialtyService
        .revokeVak(vakId)
        .pipe(
          switchMap(() => [new list.Load(), new list.RevokeSpecialtySuccess()]),
          catchError((error: HttpErrorResponse) =>
            of(
              new list.RevokeSpecialtyFail(
                error.error ? error.error.error : error.error,
              ),
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
