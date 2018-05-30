import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  ActionModel,
  CreateActionDto,
  UpdateActionDto
} from '@app/content/models';

export namespace ActionAction {
  // many
  export const LOAD_ALL = '[Action] Load All';
  export const LOAD_ALL_SUCCESS = '[Action] Load All Success';
  export const LOAD_ALL_FAILURE = '[Action] Load All Failure';
  // one
  export const SELECT_ONE = '[Action] Select One';
  export const CREATE_ONE = '[Action] Create One';
  export const CREATE_ONE_SUCCESS = '[Action] Create One Success';
  export const UPDATE_ONE = '[Action] Update One';
  export const UPDATE_ONE_SUCCESS = '[Action] Update One Success';
  export const DELETE_ONE = '[Action] Delete One';
  export const DELETE_ONE_SUCCESS = '[Action] Delete One Success';

  // many
  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public actionArray: ActionModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }
  // one
  export class SelectOne implements Action {
    readonly type = SELECT_ONE;
    constructor(public actionId: number | null) {}
  }
  export class CreateOne implements Action {
    readonly type = CREATE_ONE;
    constructor(public createActionDto: CreateActionDto) {}
  }
  export class CreateOneSuccess implements Action {
    readonly type = CREATE_ONE_SUCCESS;
    constructor(public created: ActionModel) {}
  }
  export class UpdateOne implements Action {
    readonly type = UPDATE_ONE;
    constructor(public updateActionDto: UpdateActionDto) {}
  }
  export class UpdateOneSuccess implements Action {
    readonly type = UPDATE_ONE_SUCCESS;
    constructor(public update: Update<ActionModel>) {}
  }
  export class DeleteOne implements Action {
    readonly type = DELETE_ONE;
    constructor(public action: ActionModel) {}
  }
  export class DeleteOneSuccess implements Action {
    readonly type = DELETE_ONE_SUCCESS;
    constructor(public key: string) {}
  }

  export type Types =
    | LoadAll
    | LoadAllSuccess
    | LoadAllFailure
    | SelectOne
    | CreateOne
    | CreateOneSuccess
    | UpdateOne
    | UpdateOneSuccess
    | DeleteOne
    | DeleteOneSuccess;
}
