import { CamModel } from './cam.model';
import { TaskModel } from './task.model';
import { RelayModel } from './relay.model';
import { EventModel } from './event.model';

export interface EventViewModel extends EventModel {
  cam: string;
  task: string;
  relay: string;
}

export namespace EventViewModel {
  export function fromData(
    event: EventModel,
    cams,
    tasks,
    relays
  ): EventViewModel {
    const task = tasks[event.taskId] as TaskModel;
    const cam = cams[task.camId] as CamModel;
    const relay = relays[event.relayId] as RelayModel;
    return {
      ...event,
      cam: cam.name,
      task: task.name,
      relay: relay.name
    };
  }
}
