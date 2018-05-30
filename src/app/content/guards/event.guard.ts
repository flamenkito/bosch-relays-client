import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, map, tap, catchError } from 'rxjs/operators';

import * as fromContent from '@app/content/reducers';

import { EventService } from '@app/content/services';
import { EventAction } from '@app/content/actions';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(
    private store: Store<fromContent.State>,
    private relayService: EventService,
  ) {}

  waitPreload(): Observable<boolean> {
    return this.store.pipe(
      select(fromContent.selectEventLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new EventAction.LoadAll());
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
