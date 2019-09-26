import { Action } from '@ngrx/store';
import { ILists } from '../../models/lists';

export const LOAD_LISTS = '[IManageSpecialty] Load Lists';
export const LOAD_LISTS_SUCCESS = '[IManageSpecialty] Load Lists Success';
export const LOAD_LISTS_FAIL = '[IManageSpecialty] Load Lists Fail';

export class LoadLists implements Action {
  readonly type = LOAD_LISTS;

  constructor() {}
}

export class LoadListsSuccess implements Action {
  readonly type = LOAD_LISTS_SUCCESS;

  constructor(public payload: ILists) {}
}

export class LoadListsFail implements Action {
  readonly type = LOAD_LISTS_FAIL;

  constructor(public payload: string) {}
}
export type ListsActions = LoadLists | LoadListsSuccess | LoadListsFail;
