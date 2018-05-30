import { SubscriptionAction } from '@app/content/actions';

export interface State {
  connection: Date | null;
  ping: Date | null;
  pong: Date | null;
}

const initialState: State = {
  connection: null,
  ping: null,
  pong: null
};

export function reducer(
  state = initialState,
  action: SubscriptionAction.Types
): State {
  switch (action.type) {
    case SubscriptionAction.SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        connection: new Date()
      };
    }
    case SubscriptionAction.PING: {
      return {
        ...state,
        ping: new Date()
      };
    }
    case SubscriptionAction.PONG: {
      return {
        ...state,
        pong: new Date()
      };
    }
    case SubscriptionAction.UNSUBSCRIBE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getConnected = (state: State) => state.connection;
export const getPing = (state: State) => state.ping;
export const getPong = (state: State) => state.pong;
