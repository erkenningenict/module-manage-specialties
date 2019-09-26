import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromSpecialties from './specialties.reducer';
import * as fromList from './list.reducer';
import * as fromRoot from '../../../app-module/store/index';

export interface SpecialtiesState {
  search: fromSearch.State;
  specialties: fromSpecialties.State;
  list: fromList.State;
}

export interface State extends fromRoot.State {
  specialties: SpecialtiesState;
}

export const reducers = {
  search: fromSearch.reducer,
  specialties: fromSpecialties.reducer,
  list: fromList.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `specialties` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.specialtiesState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getSpecialtiesState = createFeatureSelector<SpecialtiesState>(
  'specialties',
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getSpecialtyEntitiesState = createSelector(
  getSpecialtiesState,
  (state) => state.specialties,
);

export const getSelectedSpecialtyId = createSelector(
  getSpecialtyEntitiesState,
  fromSpecialties.getSelectedId,
);

export const getSpecialtyData = createSelector(
  getSpecialtyEntitiesState,
  fromSpecialties.getSpecialtyData,
);

export const getSectorenData = createSelector(
  getSpecialtyEntitiesState,
  fromSpecialties.getSectoren,
);

export const getLoadingSpecialty = createSelector(
  getSpecialtyEntitiesState,
  fromSpecialties.getLoadingSpecialty,
);
export const getLoadOneError = createSelector(
  getSpecialtyEntitiesState,
  fromSpecialties.getLoadOneError,
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getSpecialtyIds,
  selectEntities: getSpecialtyEntities,
  selectAll: getAllSpecialties,
  selectTotal: getTotalSpecialties,
} = fromSpecialties.adapter.getSelectors(getSpecialtyEntitiesState);

export const getSelectedSpecialty = createSelector(
  getSpecialtyEntities,
  getSelectedSpecialtyId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

/**
 * Just like with the specialties selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getSpecialtiesState,
  (state: SpecialtiesState) => {
    // console.log('!DH! search:', state.search);
    return state.search;
  },
);

export const getSearchSpecialtyIds = createSelector(
  getSearchState,
  fromSearch.getIds,
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery,
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading,
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError,
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of specialties in the store.
 */
export const getSearchResults = createSelector(
  getSpecialtyEntities,
  getSearchSpecialtyIds,
  (specialty, searchIds) => {
    return searchIds.map((id) => specialty[id]);
  },
);

export const getListState = createSelector(
  getSpecialtiesState,
  (state: SpecialtiesState) => state.list,
);

export const getListLoaded = createSelector(getListState, fromList.getLoaded);
export const getListLoading = createSelector(getListState, fromList.getLoading);
export const getActionLoading = createSelector(
  getListState,
  fromList.getActionLoading,
);
export const getActionError = createSelector(
  getListState,
  fromList.getActionError,
);
export const getActionCompleted = createSelector(
  getListState,
  fromList.getActionCompleted,
);
export const getListError = createSelector(getListState, fromList.getListError);
export const getList = createSelector(getListState, fromList.getList);
export const getListSpecialtiesIds = createSelector(
  getListState,
  fromList.getIds,
);

export const getSpecialtyList = createSelector(
  getSpecialtyEntities,
  getListSpecialtiesIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  },
);

// export const isSelectedSpecialtyInList = createSelector(
//   getListSpecialtiesIds,
//   getSelectedSpecialtyId,
//   (ids, selected) => {
//     return ids.indexOf(selected) > -1;
//   }
// );
