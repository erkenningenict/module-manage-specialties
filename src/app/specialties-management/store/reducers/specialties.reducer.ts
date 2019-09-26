import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ISector, ISpecialty } from '../../models/ISpecialty';
import * as specialty from '../actions/specialty';
import * as list from '../actions/list';
import { IManageSpecialty } from '../../../manage-specialty/models/manage-specialty';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<ISpecialty> {
  selectedSpecialtyId: string | null;
  loading: boolean;
  loaded: boolean;
  specialty: IManageSpecialty;
  sectoren: string[];
  error: string;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<ISpecialty> = createEntityAdapter<
  ISpecialty
>({
  selectId: (s: ISpecialty) => s.VakID,
  sortComparer: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedSpecialtyId: null,
  loading: false,
  loaded: false,
  specialty: {} as IManageSpecialty,
  sectoren: [],
  error: undefined,
});

export function reducer(
  state = initialState,
  action: specialty.Actions | list.Actions,
): State {
  switch (action.type) {
    case specialty.SEARCH_COMPLETE:
    case list.LOAD_SUCCESS: {
      return {
        /**
         * The addMany function provided by the created adapter
         * adds many records to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.addMany(action.payload, state),
        selectedSpecialtyId: state.selectedSpecialtyId,
      };
    }

    case specialty.LOAD: {
      return {
        /**
         * The addOne function provided by the created adapter
         * adds one record to the entity dictionary
         * and returns a new state including that records if it doesn't
         * exist already. If the collection is to be sorted, the adapter will
         * insert the new record into the sorted array.
         */
        ...adapter.addOne(action.payload, state),
        selectedSpecialtyId: state.selectedSpecialtyId,
      };
    }

    case specialty.SELECT: {
      return {
        ...state,
        selectedSpecialtyId: action.payload,
      };
    }

    case specialty.LOAD_ONE: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: undefined,
      };
    }

    case specialty.LOAD_ONE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        specialty: action.payload,
      };
    }

    case specialty.LOAD_ONE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
    case specialty.LOAD_SECTOREN: {
      return {
        ...state,
      };
    }

    case specialty.LOAD_SECTOREN_SUCCESS: {
      const sectoren = action.payload.map((v: ISector) => v.Naam);
      return {
        ...state,
        sectoren,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedSpecialtyId;
export const getSpecialtyData = (state: State) => state.specialty;
export const getSectoren = (state: State) => state.sectoren;
export const getLoadingSpecialty = (state: State) => state.loading;
export const getLoadOneError = (state: State) => state.error;
