import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { EventService } from '@app/content/services';
import { EventAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';

@Injectable()
export class EventEffects {
  constructor(
    private actions$: Actions,
    private actionTypeService: EventService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<EventAction.LoadAll>(EventAction.LOAD_ALL),
    switchMap(() =>
      this.actionTypeService
        .getAll()
        .pipe(
          map(items => new EventAction.LoadAllSuccess(items)),
          catchError(error => of(new EventAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<EventAction.LoadAllFailure>(EventAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );
}
