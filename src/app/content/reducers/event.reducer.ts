import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { EventModel } from '@app/content/models';
import { EventAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = EventModel;

export interface State extends EntityState<T> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<T> = createEntityAdapter<T>({
  sortComparer: BaseModel.sortById
});

const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
});
export function reducer(
  state = initialState,
  action: EventAction.Types
): State {
  switch (action.type) {
    case EventAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case EventAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.eventArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case EventAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectEventIds,
  selectEntities: selectEventMap,
  selectAll: selectEventArray,
  selectTotal: selectEventTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
