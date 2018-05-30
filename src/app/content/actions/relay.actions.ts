import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { RelayModel, UpdateRelayDto } from '@app/content/models';

export namespace RelayAction {
  // many
  export const LOAD_ALL = '[Relay] Load All';
  export const LOAD_ALL_SUCCESS = '[Relay] Load All Success';
  export const LOAD_ALL_FAILURE = '[Relay] Load All Failure';

  // one
  export const SELECT_ONE = '[Relay] Select One';
  export const UPDATE_ONE = '[Relay] Update One';
  export const UPDATE_ONE_SUCCESS = '[Relay] Update One Success';

  // many
  export class LoadAll implements Action {
    readonly type = LOAD_ALL;
  }
  export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public relayArray: RelayModel[]) {}
  }
  export class LoadAllFailure implements Action {
    readonly type = LOAD_ALL_FAILURE;
    constructor(public error: any) {}
  }
  export class UpdateOne implements Action {
    readonly type = UPDATE_ONE;
    constructor(public updateRelayDto: UpdateRelayDto) {}
  }
  export class UpdateOneSuccess implements Action {
    readonly type = UPDATE_ONE_SUCCESS;
    constructor(public update: Update<RelayModel>) {}
  }

  // one
  export class SelectOne implements Action {
    readonly type = SELECT_ONE;
    constructor(public relayId: number | null) {}
  }

  export type Types =
    | LoadAll
    | LoadAllSuccess
    | LoadAllFailure
    | SelectOne
    | UpdateOne
    | UpdateOneSuccess;
}
