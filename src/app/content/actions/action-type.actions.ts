import { Action } from '@ngrx/store';

import { ActionTypeModel } from '@app/content/models';

export namespace ActionTypeAction {
  export const LOAD_ALL = '[ActionType] Load All';
  export const LOAD_ALL_SUCCESS = '[ActionType] Load All Success';
  export const LOAD_ALL_FAILURE = '[ActionType] Load All Failure';

  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public actionTypeArray: ActionTypeModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }

  export type Types = LoadAll | LoadAllSuccess | LoadAllFailure;
}
