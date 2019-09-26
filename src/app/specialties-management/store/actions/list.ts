import { Action } from '@ngrx/store';
import { ISpecialty } from '../../models/ISpecialty';

export const ADD_SPECIALTY = '[List] Add ISpecialty';
export const ADD_SPECIALTY_SUCCESS = '[List] Add ISpecialty Success';
export const ADD_SPECIALTY_FAIL = '[List] Add ISpecialty Fail';
export const DELETE_SPECIALTY = '[List] Delete ISpecialty';
export const DELETE_SPECIALTY_SUCCESS = '[List] Delete ISpecialty Success';
export const DELETE_SPECIALTY_FAIL = '[List] Delete ISpecialty Fail';
export const REVOKE_SPECIALTY = '[List] Revoke ISpecialty';
export const REVOKE_SPECIALTY_SUCCESS = '[List] Revoke ISpecialty Success';
export const REVOKE_SPECIALTY_FAIL = '[List] Revoke ISpecialty Fail';
export const LOAD = '[List] Load';
export const SEARCH = '[List] Search';
export const LOAD_SUCCESS = '[List] Load Success';
export const LOAD_FAIL = '[List] Load Fail';

/**
 * Add ISpecialty to List Actions
 */
export class AddSpecialty implements Action {
  readonly type = ADD_SPECIALTY;

  constructor(public payload: ISpecialty) {}
}

export class AddSpecialtySuccess implements Action {
  readonly type = ADD_SPECIALTY_SUCCESS;

  constructor(public payload: ISpecialty) {}
}

export class AddSpecialtyFail implements Action {
  readonly type = ADD_SPECIALTY_FAIL;

  constructor(public payload: ISpecialty) {}
}

export class DeleteSpecialty implements Action {
  readonly type = DELETE_SPECIALTY;

  constructor(public payload: string) {}
}

export class DeleteSpecialtySuccess implements Action {
  readonly type = DELETE_SPECIALTY_SUCCESS;

  constructor(public payload: string) {}
}

export class DeleteSpecialtyFail implements Action {
  readonly type = DELETE_SPECIALTY_FAIL;

  constructor(public payload: string) {}
}

export class RevokeSpecialty implements Action {
  readonly type = REVOKE_SPECIALTY;

  constructor(public payload: string) {}
}

export class RevokeSpecialtySuccess implements Action {
  readonly type = REVOKE_SPECIALTY_SUCCESS;

  constructor() {}
}

export class RevokeSpecialtyFail implements Action {
  readonly type = REVOKE_SPECIALTY_FAIL;

  constructor(public payload: string) {}
}
/**
 * Load List Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: ISpecialty[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddSpecialty
  | AddSpecialtySuccess
  | AddSpecialtyFail
  | DeleteSpecialty
  | DeleteSpecialtySuccess
  | DeleteSpecialtyFail
  | RevokeSpecialty
  | RevokeSpecialtySuccess
  | RevokeSpecialtyFail
  | Load
  | Search
  | LoadSuccess
  | LoadFail;
