import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLists from '../reducers/lists.reducer';

export const getListsState = createSelector(
  fromFeature.getManageSpecialtyStoreState,
  (state: fromFeature.ManageSpecialtyState) => state.lists,
);
export const getVakgroepen = createSelector(
  getListsState,
  fromLists.getVakgroepen,
);
export const getThemas = createSelector(getListsState, fromLists.getThemas);

export const getCompetenties = createSelector(
  getListsState,
  fromLists.getCompetenties,
);

export const getKennisgebieden = createSelector(
  getListsState,
  fromLists.getKennisgebieden,
);

export const getGeldigeCompetenties = createSelector(
  getListsState,
  fromLists.getGeldigeThemaCompetentieCombinaties,
);

export const getActualiteiten = createSelector(
  getListsState,
  fromLists.getActualiteiten,
);
export const getBeoordelaars = createSelector(
  getListsState,
  fromLists.getBeoordelaars,
);
