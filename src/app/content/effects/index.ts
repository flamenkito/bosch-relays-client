import { ActionTypeEffects } from './action-type.effects';
import { ActionEffects } from './action.effects';
import { CamEffects } from './cam.effects';
import { EventEffects } from './event.effects';
import { TaskEffects } from './task.effects';
import { SubscriptionEffects } from './subscription.effects';
import { RelayEffects } from './relay.effects';

export const effects = [
  ActionEffects,
  ActionTypeEffects,
  CamEffects,
  EventEffects,
  RelayEffects,
  SubscriptionEffects,
  TaskEffects
];
