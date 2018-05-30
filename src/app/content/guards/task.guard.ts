import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, map, tap, catchError } from 'rxjs/operators';

import * as fromContent from '@app/content/reducers';

import { TaskService } from '@app/content/services';
import { TaskAction } from '@app/content/actions';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private store: Store<fromContent.State>,
    private taskService: TaskService,
  ) {}

  waitPreload(): Observable<boolean> {
    return this.store.pipe(
      select(fromContent.selectTaskLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TaskAction.LoadAll());
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
