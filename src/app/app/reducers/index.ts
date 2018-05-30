import { RouterStateUrl } from './router.reducer';
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromRouter from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLayout from '@app/core/reducers/layout.reducer';
import * as fromPopup from '@app/core/reducers/popup.reducer';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  layout: fromLayout.State;
  popup: fromPopup.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  layout: fromLayout.reducer,
  popup: fromPopup.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

// layout
  export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  'layout'
);

export const selectShowSidenav = createSelector(
  selectLayoutState,
  fromLayout.getShowSidenav
);

export const selectIsMobileView = createSelector(
  selectLayoutState,
  fromLayout.getIsMobileView
);

// popup
export const selectPopupState = createFeatureSelector<fromPopup.State>('popup');

export const selectShowPopup = createSelector(
  selectPopupState,
  fromPopup.getShowPopup
);

export const selectPopupMessage = createSelector(
  selectPopupState,
  fromPopup.getMessage
);
