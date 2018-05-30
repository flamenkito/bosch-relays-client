import { Action } from '@ngrx/store';
import { LoginUserDto, TokenModel, LoggedUserModel } from '@app/auth/models';

export namespace AuthAction {
  // login
  export const LOGIN = '[Auth] Login';
  export const LOGOUT = '[Auth] Logout';
  export const LOGIN_SUCCESS = '[Auth] Login Success';
  export const LOGIN_FAILURE = '[Auth] Login Failure';
  export const LOGIN_REDIRECT = '[Auth] Login Redirect';
  // loggedUser
  export const LOGGED_USER = '[Auth] LoggedUser';
  export const LOGGED_USER_SUCCESS = '[Auth] LoggedUser Success';
  export const LOGGED_USER_FAILURE = '[Auth] LoggedUser Failure';

  // login
  export class Login implements Action {
    readonly type = LOGIN;
    constructor(public loginUserDto: LoginUserDto) {}
  }
  export class Logout implements Action {
    readonly type = LOGOUT;
  }
  export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public token: TokenModel) {}
  }
  export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public error: any) {}
  }
  export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
  }
  // loggedUser
  export class LoggedUser implements Action {
    readonly type = LOGGED_USER;
  }
  export class LoggedUserSuccess implements Action {
    readonly type = LOGGED_USER_SUCCESS;
    constructor(public loggedUser: LoggedUserModel) {}
  }
  export class LoggedUserFailure implements Action {
    readonly type = LOGGED_USER_FAILURE;
    constructor(public error: any) {}
  }

  export type Types =
    | Login
    | LoginSuccess
    | LoginFailure
    | LoginRedirect
    | Logout
    | LoggedUser
    | LoggedUserSuccess
    | LoggedUserFailure;
}
