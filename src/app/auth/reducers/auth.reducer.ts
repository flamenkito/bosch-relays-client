import { TokenModel, LoggedUserModel } from '@app/auth/models';
import { AuthAction } from '@app/auth/actions';

export interface State {
  loggedIn: boolean;
  token: TokenModel | null;
  loggedUser: LoggedUserModel | null;
}

export const initialState: State = {
  loggedIn: false,
  token: null,
  loggedUser: null
};

export function reducer(state = initialState, action: AuthAction.Types): State {
  switch (action.type) {
    case AuthAction.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.token
      };
    }
    case AuthAction.LOGOUT: {
      return initialState;
    }
    // loggedUser
    case AuthAction.LOGGED_USER_SUCCESS: {
      return {
        ...state,
        loggedUser: action.loggedUser
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
export const getLoggedUser = (state: State) => state.loggedUser;
