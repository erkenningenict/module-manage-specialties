import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromManageSpecialty from './manage-specialty.reducer';
import * as fromLists from './lists.reducer';
import * as fromSkills from './skills.reducer';
// import * as fromRoot from '../../../store/index';

export interface ManageSpecialtyState {
  specialty: fromManageSpecialty.State;
  lists: fromLists.State;
  skills: fromSkills.State;
}

// export interface State extends fromRoot.State {
//   manageSpecialtyStore: ManageSpecialtyState;
// }

export const reducers: ActionReducerMap<ManageSpecialtyState> = {
  specialty: fromManageSpecialty.reducer,
  lists: fromLists.reducer,
  skills: fromSkills.reducer,
};

export const getManageSpecialtyStoreState = createFeatureSelector<
  ManageSpecialtyState
>('manageSpecialty');
