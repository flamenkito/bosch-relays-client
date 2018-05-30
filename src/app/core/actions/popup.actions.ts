import { Action } from '@ngrx/store';

export namespace PopupAction {
  export const POPUP_OPEN = '[Popup] Open Popup';
  export const POPUP_CLOSE = '[Popup] Close Popup';

  export class Show implements Action {
    readonly type = POPUP_OPEN;
    constructor(public message: string) {}
  }

  export class Dismiss implements Action {
    readonly type = POPUP_CLOSE;
  }

  export type Types = Show | Dismiss;
}
