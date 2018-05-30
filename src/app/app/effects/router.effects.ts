import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { RouterAction } from '@app/app/actions';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType<RouterAction.Go>(RouterAction.GO),
    map(action => action.path),
    tap(path => this.router.navigate(path))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
