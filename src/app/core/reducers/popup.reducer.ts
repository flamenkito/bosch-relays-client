import { PopupAction } from '@app/core/actions';

export interface State {
  showPopup: boolean;
  message: string | null;
}

const initialState: State = {
  showPopup: false,
  message: null
};

export function reducer(
  state: State = initialState,
  action: PopupAction.Types
): State {
  switch (action.type) {
    case PopupAction.POPUP_OPEN: {
      const time = new Date().toLocaleTimeString();
      // add time
      const message = `${time} - ${action.message}`;
      return {
        showPopup: true,
        message
      };
    }
    case PopupAction.POPUP_CLOSE: {
      return {
        ...state,
        showPopup: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const getShowPopup = (state: State) => state.showPopup;
export const getMessage = (state: State) => state.message;
