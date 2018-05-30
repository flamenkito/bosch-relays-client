import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ActionTypeService } from '@app/content/services';
import { ActionTypeAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';

@Injectable()
export class ActionTypeEffects {
  constructor(
    private actions$: Actions,
    private actionTypeService: ActionTypeService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<ActionTypeAction.LoadAll>(ActionTypeAction.LOAD_ALL),
    switchMap(() =>
      this.actionTypeService
        .getAll()
        .pipe(
          map(items => new ActionTypeAction.LoadAllSuccess(items)),
          catchError(error => of(new ActionTypeAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<ActionTypeAction.LoadAllFailure>(ActionTypeAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );
}
