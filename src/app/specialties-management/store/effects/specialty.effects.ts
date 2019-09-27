import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, Scheduler, of } from 'rxjs';

import { SpecialtyService } from '../../../services/specialty.service';
import * as specialty from '../actions/specialty';
import { ISector } from '../../models/ISpecialty';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler',
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class SpecialtyEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$
  //   .ofType<specialty.Search>(list.SEARCH)
  //   .debounceTime(this.debounce || 300, this.scheduler || async)
  //   .map((action) => action.payload)
  //   .switchMap((query) => {
  //     // if (query === '') {
  //     //   return empty();
  //     // }
  //
  //     const nextSearch$ = this.actions$.ofType(list.SEARCH).skip(1);
  //
  //     return this.specialtyService
  //       .getVakken(query)
  //       .takeUntil(nextSearch$)
  //       .map(
  //         (specialties: ISpecialty[]) =>
  //           new list.LoadSuccess(specialties),
  //       )
  //       .catch((err) => of(new list.LoadFail(err)));
  //   });

  @Effect()
  fetchManageSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType<specialty.LoadOne>(specialty.LOAD_ONE),
    map((action: specialty.LoadOne) => action.payload),
    switchMap((vakId: any) => {
      return this.specialtyService.getVak(vakId, true).pipe(
        map((vak: IManageSpecialty) => new specialty.LoadOneSuccess(vak)),
        catchError((error: HttpErrorResponse) => {
          return of(new specialty.LoadOneFail(error.error));
        }),
      );
    }),
  );

  @Effect()
  fetchSectoren$: Observable<Action> = this.actions$.pipe(
    ofType<specialty.LoadSectoren>(specialty.LOAD_SECTOREN),
    map((action: specialty.LoadSectoren) => action.payload),
    switchMap((vakId: any) => {
      return this.specialtyService
        .getVakKennisgebieden(vakId)
        .pipe(
          map((data: ISector[]) => new specialty.LoadSectorenSuccess(data)),
          catchError((error) => of(new specialty.LoadSectorenFail(error))),
        );
    }),
  );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler,
  ) {}
}
