import { Action } from '@ngrx/store';

export namespace RouterAction {
  export const GO = '[Router] Go';

  export class Go implements Action {
    readonly type = GO;
    constructor(public path: string[]) {}
  }

  export type Types = Go;
}
