import { AuthAction } from '@app/auth/actions';
import { getErrorMessage } from '@app/shared/get-error-message';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(state = initialState, action: AuthAction.Types): State {
  switch (action.type) {
    case AuthAction.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }

    case AuthAction.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false
      };
    }

    case AuthAction.LOGIN_FAILURE: {
      const error = getErrorMessage(action.error);
      return {
        ...state,
        error,
        pending: false
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
