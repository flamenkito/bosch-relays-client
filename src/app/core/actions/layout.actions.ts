import { Action } from '@ngrx/store';

export namespace LayoutAction {
  export const SIDENAV_OPEN = '[Layout] Open Sidenav';
  export const SIDENAV_CLOSE = '[Layout] Close Sidenav';
  export const SIDENAV_TOGGLE = '[Layout] Toggle Sidenav';
  export const MOBILE_VIEW = '[Layout] Mobile View';

  export class Open implements Action {
    readonly type = SIDENAV_OPEN;
  }
  export class Close implements Action {
    readonly type = SIDENAV_CLOSE;
  }
  export class Toggle implements Action {
    readonly type = SIDENAV_TOGGLE;
  }
  export class MobileView implements Action {
    readonly type = MOBILE_VIEW;
    constructor(public isMobileView: boolean) {}
  }

  export type Types = Open | Close | Toggle | MobileView;
}
