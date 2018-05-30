import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { TaskModel } from '@app/content/models';
import { TaskAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = TaskModel;

export interface State extends EntityState<T> {
  loaded: boolean;
  loading: boolean;
  selectedTaskId: number | null;
}

export const adapter: EntityAdapter<T> = createEntityAdapter<T>({
  sortComparer: BaseModel.sortById
});

const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedTaskId: null
});
export function reducer(
  state = initialState,
  action: TaskAction.Types
): State {
  switch (action.type) {
    // many
    case TaskAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case TaskAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.taskArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case TaskAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case TaskAction.UPSERT_ALL_SUCCESS: {
      return adapter.upsertMany(action.updates, state);
    }
    case TaskAction.DELETE_ALL_SUCCESS: {
      return adapter.removeMany(action.keys, state);
    }
    // one
    case TaskAction.SELECT_ONE: {
      const selectedTaskId = action.taskId;
      return {
        ...state,
        selectedTaskId
      };
    }
    case TaskAction.UPDATE_ONE_SUCCESS: {
      return adapter.updateOne(action.update, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskMap,
  selectAll: selectTaskArray,
  selectTotal: selectTaskTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSelectedTaskId = (state: State) => state.selectedTaskId;
