import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '@app/app/reducers';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';

export interface AuthState {
  loginPage: fromLoginPage.State;
  status: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  loginPage: fromLoginPage.reducer,
  status: fromAuth.reducer
};

// feature state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// login page
export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

// status
export const selectStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectLoggedIn = createSelector(
  selectStatusState,
  fromAuth.getLoggedIn
);

export const selectToken = createSelector(selectStatusState, fromAuth.getToken);
export const selectLoggedUser = createSelector(selectStatusState, fromAuth.getLoggedUser);
