import * as skills from '../actions/skills.action';
import { ISkills } from '../../models/skills';

export interface State {
  loaded: boolean;
  loading: boolean;
  skills: ISkills;
}

const initialState: State = {
  loaded: false,
  loading: false,
  skills: {
    Vaardigheden: [],
    MinimumPunten: 0,
    VakVragen: [],
  },
};

export function reducer(
  state = initialState,
  action: skills.SkillsActions,
): State {
  switch (action.type) {
    case skills.LOAD_SKILLS: {
      return {
        ...state,
        loading: true,
      };
    }

    case skills.LOAD_SKILLS_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        skills: action.payload,
      };
    }

    case skills.LOAD_SKILLS_FAIL: {
      return {
        loaded: false,
        loading: false,
        skills: null,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSkills = (state: State) => state.skills;

export const getVakVragen = (state: State) =>
  state.skills && state.skills.VakVragen;

export const getVaardigheden = (state: State) =>
  state.skills && state.skills.Vaardigheden;

export const getMinimumPunten = (state: State) =>
  state.skills && state.skills.MinimumPunten;
