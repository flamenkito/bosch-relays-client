import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActionModel } from '@app/content/models';
import { ActionAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = ActionModel;

export interface State extends EntityState<T> {
  loaded: boolean;
  loading: boolean;
  selectedActionId: number | null;
}

export const adapter: EntityAdapter<T> = createEntityAdapter<T>({
  sortComparer: BaseModel.sortById
});

const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedActionId: null
});
export function reducer(
  state = initialState,
  action: ActionAction.Types
): State {
  switch (action.type) {
    // many
    case ActionAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.actionArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case ActionAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    // one
    case ActionAction.SELECT_ONE: {
      const selectedActionId = action.actionId;
      return {
        ...state,
        selectedActionId
      };
    }
    case ActionAction.CREATE_ONE_SUCCESS: {
      return adapter.addOne(action.created, state);
    }
    case ActionAction.UPDATE_ONE_SUCCESS: {
      return adapter.updateOne(action.update, state);
    }
    case ActionAction.DELETE_ONE_SUCCESS: {
      return adapter.removeOne(action.key, {
        ...state,
        selectedCamId: null
      });
    }
    // no action
    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectActionIds,
  selectEntities: selectActionMap,
  selectAll: selectActionArray,
  selectTotal: selectActionTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSelectedActionId = (state: State) => state.selectedActionId;
