import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '@app/app/reducers';
import * as fromAction from './action.reducer';
import * as fromActionType from './action-type.reducer';
import * as fromCam from './cam.reducer';
import * as fromEvent from './event.reducer';
import * as fromRelay from './relay.reducer';
import * as fromSubscription from './subscription.reducer';
import * as fromTask from './task.reducer';
import {
  ActionTypeModel,
  DashboardViewModel,
  ActionModel,
  ActionViewModel,
  RelayModel,
  RelayViewModel,
  CamModel,
  TaskModel,
  CamViewModel,
  EventModel,
  EventViewModel
} from '@app/content/models';

export interface ContentState {
  action: fromAction.State;
  actionType: fromActionType.State;
  cam: fromCam.State;
  event: fromEvent.State;
  relay: fromRelay.State;
  subscription: fromSubscription.State;
  task: fromTask.State;
}

export interface State extends fromRoot.State {
  content: ContentState;
}

export const reducers: ActionReducerMap<ContentState> = {
  action: fromAction.reducer,
  actionType: fromActionType.reducer,
  cam: fromCam.reducer,
  event: fromEvent.reducer,
  relay: fromRelay.reducer,
  subscription: fromSubscription.reducer,
  task: fromTask.reducer
};

// feature state
export const selectContentState = createFeatureSelector<ContentState>(
  'content'
);

// action-type
export const selectActionTypeState = createSelector(
  selectContentState,
  (state: ContentState) => state.actionType
);

export const selectActionTypeCollection = createSelector(
  selectActionTypeState,
  fromActionType.selectActionTypeMap
);

export const selectActionTypeArray = createSelector(
  selectActionTypeState,
  fromActionType.selectActionTypeArray
);

export const selectActionTypeLoaded = createSelector(
  selectActionTypeState,
  fromActionType.getLoaded
);

export const selectActionTypeLoading = createSelector(
  selectActionTypeState,
  fromActionType.getLoading
);

// action
export const selectActionState = createSelector(
  selectContentState,
  (state: ContentState) => state.action
);

export const selectActionIds = createSelector(
  selectActionState,
  fromAction.selectActionIds
);

export const selectActionCollection = createSelector(
  selectActionState,
  fromAction.selectActionMap
);

export const selectActionArray = createSelector(
  selectActionState,
  fromAction.selectActionArray
);

export const selectActionLoaded = createSelector(
  selectActionState,
  fromAction.getLoaded
);

export const selectActionLoading = createSelector(
  selectActionState,
  fromAction.getLoading
);

export const selectedActionId = createSelector(
  selectActionState,
  fromAction.getSelectedActionId
);

export const selectedAction = createSelector(
  selectedActionId,
  selectActionCollection,
  (actionId, actionMap) => actionMap[actionId]
);

// cam
export const selectCamState = createSelector(
  selectContentState,
  (state: ContentState) => state.cam
);

export const selectCamIds = createSelector(
  selectCamState,
  fromCam.selectCamIds
);

export const selectCamCollection = createSelector(
  selectCamState,
  fromCam.selectCamMap
);

export const selectCamArray = createSelector(
  selectCamState,
  fromCam.selectCamArray
);

export const selectCamLoaded = createSelector(
  selectCamState,
  fromCam.getLoaded
);

export const selectCamLoading = createSelector(
  selectCamState,
  fromCam.getLoading
);

export const selectedCamId = createSelector(
  selectCamState,
  fromCam.getSelectedCamId
);

export const selectedCam = createSelector(
  selectedCamId,
  selectCamCollection,
  (camId, camMap) => camMap[camId]
);

// event
export const selectEventState = createSelector(
  selectContentState,
  (state: ContentState) => state.event
);

export const selectEventCollection = createSelector(
  selectEventState,
  fromEvent.selectEventMap
);

export const selectEventArray = createSelector(
  selectEventState,
  fromEvent.selectEventArray
);

export const selectEventLoaded = createSelector(
  selectEventState,
  fromEvent.getLoaded
);

export const selectEventLoading = createSelector(
  selectEventState,
  fromEvent.getLoading
);

// relay
export const selectRelayState = createSelector(
  selectContentState,
  (state: ContentState) => state.relay
);

export const selectRelayIds = createSelector(
  selectRelayState,
  fromRelay.selectRelayIds
);

export const selectRelayCollection = createSelector(
  selectRelayState,
  fromRelay.selectRelayMap
);

export const selectRelayArray = createSelector(
  selectRelayState,
  fromRelay.selectRelayArray
);

export const selectRelayLoaded = createSelector(
  selectRelayState,
  fromRelay.getLoaded
);

export const selectRelayLoading = createSelector(
  selectRelayState,
  fromRelay.getLoading
);

export const selectedRelayId = createSelector(
  selectRelayState,
  fromRelay.getSelectedRelayId
);

export const selectedRelay = createSelector(
  selectedRelayId,
  selectRelayCollection,
  (relayId, relayMap) => relayMap[relayId]
);

// task
export const selectTaskState = createSelector(
  selectContentState,
  (state: ContentState) => state.task
);

export const selectTaskIds = createSelector(
  selectTaskState,
  fromTask.selectTaskIds
);

export const selectTaskCollection = createSelector(
  selectTaskState,
  fromTask.selectTaskMap
);

export const selectTaskArray = createSelector(
  selectTaskState,
  fromTask.selectTaskArray
);

export const selectTaskLoaded = createSelector(
  selectTaskState,
  fromTask.getLoaded
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  fromTask.getLoading
);

export const selectedTaskId = createSelector(
  selectTaskState,
  fromTask.getSelectedTaskId
);

export const selectedTask = createSelector(
  selectedTaskId,
  selectTaskCollection,
  (taskId, taskMap) => taskMap[taskId]
);

export const selectedCamTaskArray = createSelector(
  selectedCam,
  selectTaskArray,
  (cam, taskArray) => taskArray.filter(task => task.camId === (cam && cam.id))
);

// subscription
export const selectSubscriptionState = createSelector(
  selectContentState,
  (state: ContentState) => state.subscription
);

export const selectSubscriptionConnected = createSelector(
  selectSubscriptionState,
  fromSubscription.getConnected
);

export const selectSubscriptionPing = createSelector(
  selectSubscriptionState,
  fromSubscription.getPing
);

export const selectSubscriptionPong = createSelector(
  selectSubscriptionState,
  fromSubscription.getPong
);

export const selectSubscriptionIcon = createSelector(
  selectSubscriptionConnected,
  selectSubscriptionPing,
  selectSubscriptionPong,
  (conn, ping, pong) => {
    if (conn === null) {
      return 'error';
    }
    // first connected
    if (ping === null && pong === null) {
      return 'question';
    }
    if (conn <= ping && ping <= pong) {
      return 'ok';
    }
    return 'question';
  }
);

// view models
const getParentState = (value: boolean): string =>
  value ? 'alert-danger' : 'alert-success';
const getChildState = (value: boolean): string =>
  value ? 'text-white bg-danger' : 'text-white bg-success';

export const selectDashboardModels = createSelector(
  selectActionTypeCollection,
  selectActionArray,
  selectCamCollection,
  selectRelayCollection,
  selectTaskCollection,
  (types, actions, cams, relays, tasks): DashboardViewModel[] =>
    actions.map(action => {
      const actionType = types[action.actionTypeId];
      const task = tasks[action.taskId];
      const cam = cams[task.camId];
      const relay = relays[action.relayId];
      return {
        text: action.name,
        icon: ActionTypeModel.getImage(actionType),
        state: getParentState(action.value),
        task: {
          header: cam.name,
          text: task.name,
          state: getChildState(task.value)
        },
        relay: {
          header: relay.name,
          text: relay.description,
          state: getChildState(relay.value)
        }
      };
    })
);

export const selectActionModels = createSelector(
  selectActionArray,
  selectActionTypeCollection,
  selectCamCollection,
  selectTaskCollection,
  selectRelayCollection,
  (actions: ActionModel[], types, cams, tasks, relays): ActionViewModel[] =>
    actions.map(action =>
      ActionViewModel.fromData(action, types, cams, tasks, relays)
    )
);

export const selectRelayModels = createSelector(
  selectRelayArray,
  selectActionModels,
  (relays: RelayModel[], actions: ActionViewModel[]): RelayViewModel[] => {
    return relays.map(relay => {
      const relayActions = actions.filter(
        action => action.relayId === relay.id
      );
      return {
        ...relay,
        icon: '/assets/ok.png',
        actions: relayActions
      };
    });
  }
);

export const selectCamModels = createSelector(
  selectCamArray,
  selectTaskArray,
  (cams: CamModel[], tasks): CamViewModel[] => {
    return cams
      .filter(cam => tasks.find(task => task.camId === cam.id))
      .map(cam => {
        return {
          ...cam,
          tasks: tasks.filter(task => task.camId === cam.id)
        };
      });
  }
);

export const selectEventModels = createSelector(
  selectEventArray,
  selectCamCollection,
  selectTaskCollection,
  selectRelayCollection,
  (events: EventModel[], cams, tasks, relays): EventViewModel[] => {
    return events.map(event =>
      EventViewModel.fromData(event, cams, tasks, relays)
    );
  }
);
