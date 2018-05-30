import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { TaskModel } from '@app/content/models';

export namespace TaskAction {
  // many
  export const LOAD_ALL = '[Task] Load All';
  export const LOAD_ALL_SUCCESS = '[Task] Load All Success';
  export const LOAD_ALL_FAILURE = '[Task] Load All Failure';
  export const UPSERT_ALL = '[Task] Upsert All';
  export const UPSERT_ALL_SUCCESS = '[Task] Upsert All Success';
  export const DELETE_ALL = '[Task] Delete All';
  export const DELETE_ALL_SUCCESS = '[Task] Delete All Success';

  // one
  export const LOAD_ONE_SUCCESS = '[Task] Load One Success';
  export const UPDATE_ONE_SUCCESS = '[Task] Update One Success';
  export const SELECT_ONE = '[Task] Select One';

  // many
  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public taskArray: TaskModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }
  export class UpsertAll implements Action {
    readonly type = UPSERT_ALL;
    constructor(public tasks: Partial<TaskModel>[]) {}
  }
  export class UpsertAllSuccess implements Action {
    readonly type = UPSERT_ALL_SUCCESS;
    constructor(public updates: Update<TaskModel>[]) {}
  }
  export class DeleteAll implements Action {
    readonly type = DELETE_ALL;
    constructor(public ids: number[]) {}
  }
  export class DeleteAllSuccess implements Action {
    readonly type = DELETE_ALL_SUCCESS;
    constructor(public keys: string[]) {}
  }

  // one
  export class LoadOneSuccess implements Action {
    readonly type = LOAD_ONE_SUCCESS;
    constructor(public task: TaskModel) {}
  }
  export class UpdateOneSuccess implements Action {
    readonly type = UPDATE_ONE_SUCCESS;
    constructor(public update: Update<TaskModel>) {}
  }
  export class SelectOne implements Action {
    readonly type = SELECT_ONE;
    constructor(public taskId: number | null) {}
  }

  export type Types =
    | LoadAll
    | LoadAllSuccess
    | LoadAllFailure
    | UpsertAll
    | UpsertAllSuccess
    | DeleteAll
    | DeleteAllSuccess
    | LoadOneSuccess
    | UpdateOneSuccess
    | SelectOne;
}
