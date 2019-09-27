import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as manageSpecialtyActions from '../actions/manage-specialty.action';
import * as listsActions from '../actions/lists.action';
import * as skillsActions from '../actions/skills.action';
import {
  IManageSpecialty,
  IUploadFileResponse,
} from '../../models/manage-specialty';
import * as fromStore from '../index';
import { SpecialtyService } from '../../../services/specialty.service';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  getManageSpecialtyItem,
  getActualiteiten,
  getGekozenKennisgebieden,
  getGeldigeCompetentiesPerThema,
  getThemaId,
  getManageSpecialtyState,
  getDatumAangemaakt,
} from '../selectors';
import { IVaardigheid } from '../../models/skills';
import { ICompetentie, ILists, IActualiteit } from '../../models/lists';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class ManageSpecialtyEffects {
  @Effect()
  fetchManageSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType<manageSpecialtyActions.FetchSpecialty>(
      manageSpecialtyActions.FETCH_SPECIALTY,
    ),
    map((action) => action),
    switchMap((payload) =>
      this.specialtyService
        .getVak(payload.vakId, payload.forPrinting)
        .pipe(
          map(
            (specialty: IManageSpecialty) =>
              new manageSpecialtyActions.FetchSpecialtySuccess(specialty),
          ),
          catchError((error) =>
            of(new manageSpecialtyActions.FetchSpecialtyFail(error)),
          ),
        ),
    ),
  );

  @Effect()
  serializeSpecialty$ = this.actions$.pipe(
    ofType(manageSpecialtyActions.SERIALIZE_SPECIALTY),
    map((action: manageSpecialtyActions.SerializeSpecialty) => action.payload),
    withLatestFrom(this.store$.select(getManageSpecialtyState)),
    switchMap(([payload, specialtyState]) => {
      return this.specialtyService
        .serializeSpecialty(payload, specialtyState)
        .pipe(
          map((serializedSpecialty: IManageSpecialty) => {
            return new manageSpecialtyActions.UpdateSpecialty(
              serializedSpecialty,
            );
          }),
          catchError((error) =>
            of(new manageSpecialtyActions.UpdateSpecialtyFail(error)),
          ),
        );
    }),
  );

  @Effect()
  uploadFile$: Observable<Action> = this.actions$.pipe(
    ofType(manageSpecialtyActions.UPLOAD_FILE),
    map((action: manageSpecialtyActions.UploadFile) => action.payload),
    switchMap((data) =>
      this.specialtyService
        .uploadFile(data.file, data.omschrijving)
        .pipe(
          map(
            (uploadFileResponse: IUploadFileResponse) =>
              new manageSpecialtyActions.UploadFileSuccess(uploadFileResponse),
          ),
          catchError((error) =>
            of(new manageSpecialtyActions.UploadFileFail(error)),
          ),
        ),
    ),
  );
  @Effect()
  updateSpecialty$: Observable<Action> = this.actions$.pipe(
    ofType(manageSpecialtyActions.UPDATE_SPECIALTY),
    map((action: manageSpecialtyActions.UpdateSpecialty) => action.payload),
    switchMap((specialty) => {
      return this.specialtyService.updateVak(specialty).pipe(
        switchMap((vakId: number) => {
          if (specialty.VakID === 0 && vakId !== 0) {
            const url = this.router
              .createUrlTree(['manage-specialty', vakId])
              .toString();
            this.location.go(url);
          }

          return [
            new manageSpecialtyActions.UpdateSpecialtySuccess(vakId),
            new manageSpecialtyActions.FetchSpecialty(vakId, false),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(new manageSpecialtyActions.UpdateSpecialtyFail(error.error)),
        ),
      );
    }),
  );

  @Effect()
  updateThema$: Observable<Action> = this.actions$.pipe(
    ofType(manageSpecialtyActions.THEMA_CHANGE),
    map((action: manageSpecialtyActions.ThemaChange) => action.payload),
    withLatestFrom(
      this.store$.select(getGeldigeCompetentiesPerThema),
      this.store$.select(getDatumAangemaakt),
    ),
    switchMap(
      ([thema, competenties, datumAangemaakt]: [any, ICompetentie[], Date]) => {
        let competentieId: number;
        switch (thema.ThemaID) {
          case 1:
            competentieId = 1;
            break;
          default:
            competentieId = competenties[0].CompetentieID;
            break;
        }
        return [
          new manageSpecialtyActions.SetCompetenties(competentieId),
          new skillsActions.LoadSkills(
            thema.ThemaID,
            competentieId,
            datumAangemaakt,
          ),
        ];
      },
    ),
  );

  @Effect()
  updateCompetentie$: Observable<Action> = this.actions$.pipe(
    ofType(manageSpecialtyActions.COMPETENTIE_CHANGE),
    map((action: manageSpecialtyActions.CompetentieChange) => action.payload),
    withLatestFrom(
      this.store$.select(getThemaId),
      this.store$.select(getDatumAangemaakt),
    ),
    switchMap(
      ([competentie, themaId, datumAangemaakt]: [any, number, Date]) => {
        return [
          new skillsActions.LoadSkills(
            themaId,
            competentie.CompetentieID,
            datumAangemaakt,
          ),
        ];
      },
    ),
  );

  @Effect()
  loadSkills = this.actions$.pipe(
    ofType(manageSpecialtyActions.FETCH_SPECIALTY_SUCCESS),
    map(
      (action: manageSpecialtyActions.FetchSpecialtySuccess) => action.payload,
    ),
    switchMap((data) => {
      return of(
        new skillsActions.LoadSkills(
          data.ThemaID === 0 ? 1 : data.ThemaID,
          data.CompetentieID === 0 ? 3 : data.CompetentieID,
          data.DatumAangemaakt,
        ),
      );
    }),
  );

  @Effect()
  loadSkillsSuccess = this.actions$.pipe(
    ofType(skillsActions.LOAD_SKILLS_SUCCESS),
    map((action: skillsActions.LoadSkillsSuccess) => action.payload),
    switchMap((payload: any) => {
      const verplichteVaardigheden = payload.Vaardigheden.filter(
        (vaardigheid: IVaardigheid) => vaardigheid.IsVerplicht,
      );
      const vakvragen = payload.VakVragen;

      return of(
        new manageSpecialtyActions.SetRequiredVaardigheden({
          vaardigheden: verplichteVaardigheden,
          vakvragen: vakvragen,
        }),
      );
    }),
  );

  @Effect()
  loadListSuccess = this.actions$.pipe(
    ofType(listsActions.LOAD_LISTS_SUCCESS),
    map((action: listsActions.LoadListsSuccess) => action.payload),
    withLatestFrom(this.store$.select(getManageSpecialtyItem)),
    switchMap(([lists, specialtyData]: [ILists, IManageSpecialty]) => {
      const vakgroepen = lists.Vakgroepen;
      if (
        vakgroepen.length === 1 &&
        specialtyData.VakgroepID === undefined &&
        specialtyData.Status === 'Nieuw'
      ) {
        return of(
          new manageSpecialtyActions.SetVakgroep({
            vakgroepId: vakgroepen[0].VakgroepID,
            vakgroepNaam: vakgroepen[0].VakgroepNaam,
          }),
        );
      }
      return of({ type: 'NO_ACTION' });
    }),
  );

  @Effect()
  updateKennisgebieden$ = this.actions$.pipe(
    ofType(
      manageSpecialtyActions.KENNISGEBIED_CHANGE,
      listsActions.LOAD_LISTS_SUCCESS,
      manageSpecialtyActions.FETCH_SPECIALTY_SUCCESS,
    ),
    withLatestFrom(this.store$.select(getActualiteiten)),
    withLatestFrom(this.store$.select(getGekozenKennisgebieden)),
    switchMap(
      (
        [[action, actualiteiten], gekozenKennisgebieden]: [
          [Action, IActualiteit[]],
          number[]
        ],
      ) => {
        const res = actualiteiten.filter(
          (actualiteit: IActualiteit) =>
            gekozenKennisgebieden &&
            gekozenKennisgebieden.length &&
            gekozenKennisgebieden.includes(actualiteit.KennisgebiedID),
        );
        return of(new manageSpecialtyActions.SetActualiteiten(res));
      },
    ),
  );

  constructor(
    private actions$: Actions,
    private specialtyService: SpecialtyService,
    private store$: Store<fromStore.ManageSpecialtyState>,
    private router: Router,
    private location: Location,
  ) {}
}
