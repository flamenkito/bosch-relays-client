import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

export namespace SubscriptionAction {
  export const SUBSCRIBE = '[Subscription] Subscribe';
  export const SUBSCRIBE_SUCCESS = '[Subscription] Subscribe Success';
  export const SUBSCRIBE_FAILURE = '[Subscription] Subscribe Failure';
  export const PING = '[Subscription] Ping';
  export const PONG = '[Subscription] Pong';
  export const UNSUBSCRIBE = '[Subscription] Unsubscribe';

  export class Subscribe implements Action {
    readonly type = SUBSCRIBE;
  }
  export class SubscribeSuccess implements Action {
    readonly type = SUBSCRIBE_SUCCESS;
    constructor(public stream$: Observable<Action>) {}
  }
  export class SubscribeFailure implements Action {
    readonly type = SUBSCRIBE_FAILURE;
    constructor(public error: any) {}
  }
  export class Ping implements Action {
    readonly type = PING;
  }
  export class Pong implements Action {
    readonly type = PONG;
  }
  export class Unsubscribe implements Action {
    readonly type = UNSUBSCRIBE;
  }

  export type Types =
    | Subscribe
    | SubscribeSuccess
    | SubscribeFailure
    | Ping
    | Pong
    | Unsubscribe;
}
