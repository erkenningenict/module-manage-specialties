import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSkills from '../reducers/skills.reducer';

export const getSkillsState = createSelector(
  fromFeature.getManageSpecialtyStoreState,
  (state: fromFeature.ManageSpecialtyState) => state.skills,
);
export const getSkills = createSelector(
  getSkillsState,
  fromSkills.getVaardigheden,
);

export const getVakVragen = createSelector(
  getSkillsState,
  fromSkills.getVakVragen,
);

export const getMinimumPunten = createSelector(
  getSkillsState,
  fromSkills.getMinimumPunten,
);
