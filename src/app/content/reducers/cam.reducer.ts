import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CamModel } from '@app/content/models';
import { CamAction } from '@app/content/actions';
import { BaseModel } from '@app/shared/models';

type T = CamModel;

export interface State extends EntityState<T> {
  loaded: boolean;
  loading: boolean;
  selectedCamId: number | null;
}

export const adapter: EntityAdapter<T> = createEntityAdapter<T>({
  sortComparer: BaseModel.sortById
});

const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedCamId: null
});
export function reducer(state = initialState, action: CamAction.Types): State {
  switch (action.type) {
    // many
    case CamAction.LOAD_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case CamAction.LOAD_ALL_SUCCESS: {
      return adapter.addMany(action.camArray, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case CamAction.LOAD_ALL_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    // one
    case CamAction.CREATE_ONE_SUCCESS: {
      return adapter.addOne(action.cam, state);
    }
    case CamAction.UPDATE_ONE_SUCCESS: {
      return adapter.updateOne(action.cam, state);
    }
    case CamAction.DELETE_ONE_SUCCESS: {
      return adapter.removeOne(action.key, {
        ...state,
        selectedCamId: null
      });
    }
    case CamAction.SELECT_ONE: {
      const selectedCamId = action.camId;
      return {
        ...state,
        selectedCamId
      };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectCamIds,
  selectEntities: selectCamMap,
  selectAll: selectCamArray,
  selectTotal: selectCamTotal
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSelectedCamId = (state: State) => state.selectedCamId;
