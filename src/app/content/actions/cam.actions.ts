import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CamModel, CreateCamDto, UpdateCamDto } from '@app/content/models';

export namespace CamAction {
  // many
  export const LOAD_ALL = '[Cam] Load All';
  export const LOAD_ALL_SUCCESS = '[Cam] Load All Success';
  export const LOAD_ALL_FAILURE = '[Cam] Load All Failure';

  // one
  export const LOAD_ONE_SUCCESS = '[Cam] Load One Success';
  export const CREATE_ONE = '[Cam] Create One';
  export const CREATE_ONE_SUCCESS = '[Cam] Create One Success';
  export const UPDATE_ONE = '[Cam] Update One';
  export const UPDATE_ONE_SUCCESS = '[Cam] Update One Success';
  export const DELETE_ONE = '[Cam] Delete One';
  export const DELETE_ONE_SUCCESS = '[Cam] Delete One Success';
  export const SELECT_ONE = '[Cam] Select One';

  // many
  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public camArray: CamModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }

  // one
  export class LoadOneSuccess implements Action {
    readonly type = LOAD_ONE_SUCCESS;
    constructor(public cam: CamModel) {}
  }
  export class CreateOne implements Action {
    readonly type = CREATE_ONE;
    constructor(public createCamDto: CreateCamDto) {}
  }
  export class CreateOneSuccess implements Action {
    readonly type = CREATE_ONE_SUCCESS;
    constructor(public cam: CamModel) {}
  }
  export class UpdateOne implements Action {
    readonly type = UPDATE_ONE;
    constructor(public updateCamDto: UpdateCamDto) {}
  }
  export class UpdateOneSuccess implements Action {
    readonly type = UPDATE_ONE_SUCCESS;
    constructor(public cam: Update<CamModel>) {}
  }
  export class DeleteOne implements Action {
    readonly type = DELETE_ONE;
    constructor(public id: number) {}
  }
  export class DeleteOneSuccess implements Action {
    readonly type = DELETE_ONE_SUCCESS;
    constructor(public key: string) {}
  }
  export class SelectOne implements Action {
    readonly type = SELECT_ONE;
    constructor(public camId: number | null) {}
  }

  export type Types =
    | LoadAll
    | LoadAllSuccess
    | LoadAllFailure
    | LoadOneSuccess
    | CreateOne
    | CreateOneSuccess
    | UpdateOne
    | UpdateOneSuccess
    | DeleteOne
    | DeleteOneSuccess
    | SelectOne;
}
