import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, defer, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';

import { LoginUserDto } from '@app/auth/models';
import { AuthService } from '@app/auth/services';
import { AuthAction } from '@app/auth/actions';
import { RouterAction } from '@app/app/actions';
import { PopupAction } from '@app/core/actions';
import { SubscriptionAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';
import { LocalStorageService } from '@app/shared/services';

const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<any>
  ) {}

  @Effect()
  init$: Observable<Action> = defer(() => {
    const auth = this.localStorageService.getItem(AUTH_KEY);
    if (auth && auth.token) {
      // TODO: refactor
      this.store.dispatch(new AuthAction.LoginSuccess(auth.token));
    }
  });

  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthAction.Login>(AuthAction.LOGIN),
    map(action => action.loginUserDto),
    exhaustMap((loginUserDto: LoginUserDto) =>
      this.authService.login(loginUserDto).pipe(
        tap(token =>
          this.localStorageService.setItem(AUTH_KEY, {
            token
          })
        ),
        map(token => new AuthAction.LoginSuccess(token)),
        catchError(err => of(new AuthAction.LoginFailure(err)))
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<AuthAction.Logout>(AuthAction.LOGOUT),
    tap(() =>
      this.localStorageService.setItem(AUTH_KEY, {
        token: null
      })
    ),
    map(() => new AuthAction.LoginRedirect())
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthAction.LOGIN_SUCCESS),
    switchMap(() => [
      new AuthAction.LoggedUser(),
      new SubscriptionAction.Subscribe()
    ])
  );

  @Effect()
  loginFailure$ = this.actions$.pipe(
    ofType<AuthAction.LoginFailure>(AuthAction.LOGIN_FAILURE),
    map(action => action.error),
    switchMap(err => [showError(err)])
  );

  @Effect()
  loggedUser$ = this.actions$.pipe(
    ofType(AuthAction.LOGGED_USER),
    switchMap(() =>
      this.authService
        .loggedUser()
        .pipe(
          map(loggedUser => new AuthAction.LoggedUserSuccess(loggedUser)),
          catchError(err => of(new AuthAction.LoggedUserFailure(err)))
        )
    )
  );

  @Effect()
  loggedUserSuccess$ = this.actions$.pipe(
    ofType<AuthAction.LoggedUserSuccess>(AuthAction.LOGGED_USER_SUCCESS),
    map(action => action.loggedUser),
    switchMap(loggedUser => [
      new RouterAction.Go(['/']),
      new PopupAction.Show(`Logged in as ${loggedUser.name}`)
    ])
  );

  @Effect()
  loggedUserFailure$ = this.actions$.pipe(
    ofType(AuthAction.LOGGED_USER_FAILURE),
    switchMap(err => [
      new AuthAction.Logout(),
      new AuthAction.LoginFailure(err),
      showError(err)
    ])
  );

  @Effect()
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthAction.LOGIN_REDIRECT, AuthAction.LOGOUT),
    map(() => new RouterAction.Go(['/login']))
  );
}
