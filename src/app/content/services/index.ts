import { ActionService } from './action.service';
import { ActionTypeService } from './action-type.service';
import { CamService } from './cam.service';
import { EventService } from './event.service';
import { RelayService } from './relay.service';
import { SubscriptionService } from './subscription.service';
import { TaskService } from './task.service';

export const services = [
  ActionService,
  ActionTypeService,
  CamService,
  EventService,
  RelayService,
  SubscriptionService,
  TaskService
];

export * from './action.service';
export * from './action-type.service';
export * from './cam.service';
export * from './event.service';
export * from './relay.service';
export * from './subscription.service';
export * from './task.service';
