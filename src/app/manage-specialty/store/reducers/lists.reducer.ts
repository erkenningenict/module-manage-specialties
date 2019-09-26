import * as lists from '../actions/lists.action';
import { IActualiteit, ILists } from '../../models/lists';

export interface State {
  loaded: boolean;
  loading: boolean;
  lists: ILists;
  actualiteiten: IActualiteit[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  lists: {
    Vakgroepen: [],
    Actualiteiten: [],
    Beoordelaars: [],
    Competenties: [],
    Kennisgebieden: [],
    GeldigeThemaCompetentieCombinaties: [],
    Themas: [],
  },
  actualiteiten: [],
};

export function reducer(
  state = initialState,
  action: lists.ListsActions,
): State {
  switch (action.type) {
    case lists.LOAD_LISTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case lists.LOAD_LISTS_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        lists: action.payload,
        actualiteiten: [],
      };
    }

    case lists.LOAD_LISTS_FAIL: {
      return {
        loaded: false,
        loading: false,
        lists: null,
        actualiteiten: [],
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getLists = (state: State) => state.lists;
export const getActualiteiten = (state: State) =>
  state && state.lists && state.lists.Actualiteiten;
export const getBeoordelaars = (state: State) =>
  state && state.lists && state.lists.Beoordelaars;

export const getVakgroepen = (state: State) => state.lists.Vakgroepen;

export const getThemas = (state: State) => state.lists.Themas;

export const getCompetenties = (state: State) => state.lists.Competenties;
export const getKennisgebieden = (state: State) => state.lists.Kennisgebieden;

export const getGeldigeThemaCompetentieCombinaties = (state: State) =>
  state.lists.GeldigeThemaCompetentieCombinaties;
