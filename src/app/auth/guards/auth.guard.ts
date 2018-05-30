import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '@app/auth/reducers';

import { AuthAction } from '@app/auth/actions';
import { LocalStorageService } from '@app/shared/services';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private store: Store<fromAuth.State>,
    private localStorageService: LocalStorageService
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return of(true);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(new AuthAction.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }
}
