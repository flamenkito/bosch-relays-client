import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, map, tap, catchError } from 'rxjs/operators';

import * as fromContent from '@app/content/reducers';

import { CamService } from '@app/content/services';
import { CamAction } from '@app/content/actions';

@Injectable()
export class CamGuard implements CanActivate {
  constructor(
    private store: Store<fromContent.State>,
    private camService: CamService,
  ) {}

  waitPreload(): Observable<boolean> {
    return this.store.pipe(
      select(fromContent.selectCamLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new CamAction.LoadAll());
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
