import { LayoutAction } from '@app/core/actions';

export interface State {
  showSidenav: boolean;
  isMobileView: boolean;
}

const initialState: State = {
  showSidenav: false,
  isMobileView: false
};

export function reducer(
  state: State = initialState,
  action: LayoutAction.Types
): State {
  switch (action.type) {
    case LayoutAction.SIDENAV_OPEN: {
      return {
        ...state,
        showSidenav: true
      };
    }
    case LayoutAction.SIDENAV_CLOSE: {
      return {
        ...state,
        showSidenav: false
      };
    }
    case LayoutAction.SIDENAV_TOGGLE: {
      return {
        ...state,
        showSidenav: !state.showSidenav
      };
    }
    case LayoutAction.MOBILE_VIEW: {
      return {
        ...state,
        isMobileView: action.isMobileView
      };
    }

    default: {
      return state;
    }
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getIsMobileView = (state: State) => state.isMobileView;
