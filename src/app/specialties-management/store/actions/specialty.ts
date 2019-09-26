import { Action } from '@ngrx/store';
import { ISector, ISpecialty } from '../../models/ISpecialty';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';

export const SEARCH = '[ISpecialty] Search';
export const SEARCH_COMPLETE = '[ISpecialty] Search Complete';
export const SEARCH_ERROR = '[ISpecialty] Search Error';
export const LOAD = '[ISpecialty] Load';
export const SELECT = '[ISpecialty] Select';
export const LOAD_ONE = '[ISpecialty] Load one';
export const LOAD_ONE_SUCCESS = '[ISpecialty] Load one success';
export const LOAD_ONE_FAIL = '[ISpecialty] Load one fail';
export const LOAD_SECTOREN = '[ISpecialty] Load sectoren';
export const LOAD_SECTOREN_SUCCESS = '[ISpecialty] Load sectoren success';
export const LOAD_SECTOREN_FAIL = '[ISpecialty] Load sectoren fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: ISpecialty[]) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: ISpecialty) {}
}

export class LoadOne implements Action {
  readonly type = LOAD_ONE;

  constructor(public payload: number) {}
}

export class LoadOneSuccess implements Action {
  readonly type = LOAD_ONE_SUCCESS;

  constructor(public payload: IManageSpecialty) {}
}

export class LoadOneFail implements Action {
  readonly type = LOAD_ONE_FAIL;

  constructor(public payload: string) {}
}
export class LoadSectoren implements Action {
  readonly type = LOAD_SECTOREN;

  constructor(public payload: number) {}
}

export class LoadSectorenSuccess implements Action {
  readonly type = LOAD_SECTOREN_SUCCESS;

  constructor(public payload: ISector[]) {}
}

export class LoadSectorenFail implements Action {
  readonly type = LOAD_SECTOREN_FAIL;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select
  | LoadOne
  | LoadOneSuccess
  | LoadOneFail
  | LoadSectoren
  | LoadSectorenSuccess
  | LoadSectorenFail;
