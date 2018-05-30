import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { RelayModel } from '@app/content/models';
import { RelayAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = RelayModel;

export interface State extends EntityState<T> {
  loaded: boolean;
  loading: boolean;
  selectedRelayId: number | null;
}

export const adapter: EntityAdapter<T> = createEntityAdapter<T>({
  sortComparer: BaseModel.sortById
});

const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedRelayId: null
});
export function reducer(
  state = initialState,
  action: RelayAction.Types
): State {
  switch (action.type) {
    // many
    case RelayAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case RelayAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.relayArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case RelayAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    // one
    case RelayAction.SELECT_ONE: {
      const selectedRelayId = action.relayId;
      return {
        ...state,
        selectedRelayId
      };
    }
    case RelayAction.UPDATE_ONE_SUCCESS: {
      return adapter.updateOne(action.update, state);
    }

    // no action
    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectRelayIds,
  selectEntities: selectRelayMap,
  selectAll: selectRelayArray,
  selectTotal: selectRelayTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSelectedRelayId = (state: State) => state.selectedRelayId;
