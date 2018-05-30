import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '@app/auth/reducers';

@Injectable()
export class LoginPageGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.selectLoggedIn)
      .pipe(map(loggedIn => !loggedIn), take(1));
  }
}
