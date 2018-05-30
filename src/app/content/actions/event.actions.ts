import { Action } from '@ngrx/store';

import { EventModel } from '@app/content/models';

export namespace EventAction {
  export const LOAD_ALL = '[Event] Load All';
  export const LOAD_ALL_SUCCESS = '[Event] Load All Success';
  export const LOAD_ALL_FAILURE = '[Event] Load All Failure';

  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public eventArray: EventModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }

  export type Types = LoadAll | LoadAllSuccess | LoadAllFailure;
}
