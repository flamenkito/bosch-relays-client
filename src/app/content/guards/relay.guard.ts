import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, map, tap, catchError } from 'rxjs/operators';

import * as fromContent from '@app/content/reducers';

import { RelayService } from '@app/content/services';
import { RelayAction } from '@app/content/actions';

@Injectable()
export class RelayGuard implements CanActivate {
  constructor(
    private store: Store<fromContent.State>,
    private relayService: RelayService,
  ) {}

  waitPreload(): Observable<boolean> {
    return this.store.pipe(
      select(fromContent.selectRelayLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new RelayAction.LoadAll());
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
