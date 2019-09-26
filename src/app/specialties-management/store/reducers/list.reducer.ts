import * as list from '../actions/list';
import { ISpecialty } from '../../models/ISpecialty';

export interface State {
  loaded: boolean;
  loading: boolean;
  list: ISpecialty[];
  ids: number[];
  error: string;
  actionError: string;
  actionLoading: boolean;
  actionCompleted: boolean;
}

const initialState: State = {
  loaded: false,
  loading: false,
  list: [],
  ids: [],
  error: undefined,
  actionError: undefined,
  actionLoading: false,
  actionCompleted: false,
};

export function reducer(state = initialState, action: list.Actions): State {
  switch (action.type) {
    case list.LOAD: {
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    }

    case list.SEARCH: {
      return {
        ...state,
        loading: true,
      };
    }

    case list.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        list: action.payload,
      };
    }

    case list.LOAD_FAIL: {
      // console.log('#DH# fail', action);
      return {
        ...state,
        loaded: false,
        loading: false,
        list: [],
        error: action.payload,
      };
    }

    case list.DELETE_SPECIALTY:
    case list.REVOKE_SPECIALTY: {
      return {
        ...state,
        actionLoading: true,
        actionCompleted: false,
        actionError: undefined,
      };
    }

    case list.DELETE_SPECIALTY_FAIL: {
      // if (state.ids.indexOf(action.payload.VakID) > -1) {
      //   return state;
      // }
      return {
        ...state,
        // ids: [...state.ids, action.payload.VakID],
        actionError: action.payload,
        actionLoading: false,
      };
    }

    case list.DELETE_SPECIALTY_SUCCESS: {
      return {
        ...state,
        ids: state.ids.filter((id) => id !== parseInt(action.payload, 10)),
        actionLoading: false,
        actionCompleted: true,
      };
    }

    case list.REVOKE_SPECIALTY_FAIL: {
      // if (state.ids.indexOf(action.payload.VakID) > -1) {
      //   return state;
      // }

      return {
        ...state,
        // ids: [...state.ids, action.payload.VakID],
        actionError: action.payload,
        actionLoading: false,
      };
    }

    case list.REVOKE_SPECIALTY_SUCCESS: {
      return {
        ...state,
        actionLoading: false,
        actionCompleted: true,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
export const getActionLoading = (state: State) => state.actionLoading;
export const getActionError = (state: State) => state.actionError;
export const getActionCompleted = (state: State) => state.actionCompleted;
export const getListError = (state: State) =>
  state && state.error && state.error !== undefined;
export const getList = (state: State) => state && state.list;
export const getIds = (state: State) => state.ids;
