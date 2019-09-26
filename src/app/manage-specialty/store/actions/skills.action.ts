import { Action } from '@ngrx/store';
import { ISkills } from '../../models/skills';

export const LOAD_SKILLS = '[IManageSpecialty] Load Skills';
export const LOAD_SKILLS_SUCCESS = '[IManageSpecialty] Load Skills Success';
export const LOAD_SKILLS_FAIL = '[IManageSpecialty] Load Skills Fail';

export class LoadSkills implements Action {
  readonly type = LOAD_SKILLS;

  constructor(
    public themaId: number,
    public competentieId: number,
    public specialtyDate: Date,
  ) {}
}

export class LoadSkillsSuccess implements Action {
  readonly type = LOAD_SKILLS_SUCCESS;

  constructor(public payload: ISkills) {}
}

export class LoadSkillsFail implements Action {
  readonly type = LOAD_SKILLS_FAIL;

  constructor(public payload: string) {}
}
export type SkillsActions = LoadSkills | LoadSkillsSuccess | LoadSkillsFail;
