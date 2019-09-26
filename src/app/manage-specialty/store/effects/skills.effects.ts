import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as skillsActions from '../actions/skills.action';
import { ISkills } from '../../models/skills';
import { SpecialtyService } from '../../../services/specialty.service';

@Injectable()
export class SkillsEffects {
  @Effect()
  fetchSkills$: Observable<Action> = this.actions$
    .ofType<skillsActions.LoadSkills>(skillsActions.LOAD_SKILLS)
    .map((action) => action)
    .switchMap((payload) =>
      this.specialtyService
        .getVaardigheden(
          payload.themaId,
          payload.competentieId,
          payload.specialtyDate,
        )
        .map((_: ISkills) => new skillsActions.LoadSkillsSuccess(_))
        .catch((error) => of(new skillsActions.LoadSkillsFail(error))),
    );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
  ) {}
}
