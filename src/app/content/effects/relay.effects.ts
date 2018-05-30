import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { RouterAction } from '@app/app/actions';
import { RelayService } from '@app/content/services';
import { RelayAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';

@Injectable()
export class RelayEffects {
  constructor(
    private actions$: Actions,
    private relayService: RelayService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<RelayAction.LoadAll>(RelayAction.LOAD_ALL),
    switchMap(() =>
      this.relayService
        .getAll()
        .pipe(
          map(items => new RelayAction.LoadAllSuccess(items)),
          catchError(error => of(new RelayAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<RelayAction.LoadAllFailure>(RelayAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );

  @Effect()
  selectOne$ = this.actions$.pipe(
    ofType<RelayAction.SelectOne>(RelayAction.SELECT_ONE),
    map(action => action.relayId),
    map(relayId => new RouterAction.Go(['/content', 'relays', String(relayId)]))
  );

  @Effect()
  updateOne$ = this.actions$.pipe(
    ofType<RelayAction.UpdateOne>(RelayAction.UPDATE_ONE),
    map(action => action.updateRelayDto),
    switchMap(updateRelayDto =>
      this.relayService
        .updateOne(updateRelayDto)
        .pipe(
          map(
            ({ id, ...changes }) =>
              new RelayAction.UpdateOneSuccess({ id, changes })
          ),
          catchError(error => of(showError(error)))
        )
    )
  );
}
