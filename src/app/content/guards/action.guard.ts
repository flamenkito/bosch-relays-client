import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import * as fromContent from '@app/content/reducers';

import { ActionAction } from '@app/content/actions';

@Injectable()
export class ActionGuard implements CanActivate {
  constructor(private store: Store<fromContent.State>) {}

  waitPreload(): Observable<boolean> {
    return this.store.pipe(
      select(fromContent.selectActionLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new ActionAction.LoadAll());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.waitPreload();
  }
}
