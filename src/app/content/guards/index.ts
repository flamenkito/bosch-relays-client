import { ActionTypeGuard } from './action-type.guard';
import { ActionGuard } from './action.guard';
import { CamGuard } from './cam.guard';
import { EventGuard } from './event.guard';
import { TaskGuard } from './task.guard';
import { RelayGuard } from './relay.guard';
import { CamEditPageGuard } from './cam-edit-page.guard';

export const preloaders = [
  ActionGuard,
  ActionTypeGuard,
  CamGuard,
  EventGuard,
  RelayGuard,
  TaskGuard
];

export const guards = [...preloaders, CamEditPageGuard];

export * from './action.guard';
export * from './action-type.guard';
export * from './cam-edit-page.guard';
export * from './cam.guard';
export * from './event.guard';
export * from './relay.guard';
export * from './task.guard';
