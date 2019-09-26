import * as specialty from '../actions/specialty';

export interface State {
  ids: number[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(
  state = initialState,
  action: specialty.Actions,
): State {
  switch (action.type) {
    case specialty.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case specialty.SEARCH_COMPLETE: {
      return {
        ids: action.payload.map((s) => s.VakID),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case specialty.SEARCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
