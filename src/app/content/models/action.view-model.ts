import { ActionModel } from './action.model';
import { ActionTypeModel } from './action-type.model';
import { CamModel } from './cam.model';
import { TaskModel } from './task.model';
import { RelayModel } from './relay.model';

export interface ActionViewModel extends ActionModel {
  icon: string;
  cam: CamModel;
  task: TaskModel;
  relay: RelayModel;
}

export namespace ActionViewModel {
  export function fromData(
    action: ActionModel,
    types,
    cams,
    tasks,
    relays
  ): ActionViewModel {
    const actionType = types[action.actionTypeId] as ActionTypeModel;
    const icon = ActionTypeModel.getImage(actionType);
    const task = tasks[action.taskId] as TaskModel;
    const cam = cams[task.camId] as CamModel;
    const relay = relays[action.relayId] as RelayModel;
    return {
      ...action,
      icon,
      cam,
      task,
      relay
    };
  }

  export function createPartial(
    cam: CamModel,
    task: TaskModel,
    relay: RelayModel
  ): Partial<ActionViewModel> {
    return {
      taskId: task.id,
      relayId: relay.id,
      cam,
      task,
      relay
    };
  }
}
