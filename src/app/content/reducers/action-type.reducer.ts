import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActionTypeModel } from '@app/content/models';
import { ActionTypeAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = ActionTypeModel;

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
  action: ActionTypeAction.Types
): State {
  switch (action.type) {
    case ActionTypeAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionTypeAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.actionTypeArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case ActionTypeAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    // no action
    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectActionTypeIds,
  selectEntities: selectActionTypeMap,
  selectAll: selectActionTypeArray,
  selectTotal: selectActionTypeTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
