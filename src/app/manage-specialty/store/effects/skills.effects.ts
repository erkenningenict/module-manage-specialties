import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as skillsActions from '../actions/skills.action';
import { ISkills } from '../../models/skills';
import { SpecialtyService } from '../../../services/specialty.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class SkillsEffects {
  @Effect()
  fetchSkills$: Observable<Action> = this.actions$.pipe(
    ofType<skillsActions.LoadSkills>(skillsActions.LOAD_SKILLS),
    map((action) => action),
    switchMap((payload) =>
      this.specialtyService
        .getVaardigheden(
          payload.themaId,
          payload.competentieId,
          payload.specialtyDate,
        )
        .pipe(
          map((_: ISkills) => new skillsActions.LoadSkillsSuccess(_)),
          catchError((error) => of(new skillsActions.LoadSkillsFail(error))),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
  ) {}
}
