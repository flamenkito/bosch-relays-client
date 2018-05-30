import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ActionService } from '@app/content/services';
import { ActionAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';
import { PopupAction } from '@app/core/actions';

@Injectable()
export class ActionEffects {
  constructor(
    private actions$: Actions,
    private actionService: ActionService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<ActionAction.LoadAll>(ActionAction.LOAD_ALL),
    switchMap(() =>
      this.actionService
        .getAll()
        .pipe(
          map(items => new ActionAction.LoadAllSuccess(items)),
          catchError(error => of(new ActionAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<ActionAction.LoadAllFailure>(ActionAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );

  @Effect()
  createOne$ = this.actions$.pipe(
    ofType<ActionAction.CreateOne>(ActionAction.CREATE_ONE),
    map(action => action.createActionDto),
    switchMap(createActionDto =>
      this.actionService
        .createOne(createActionDto)
        .pipe(
          switchMap(action => [
            new ActionAction.CreateOneSuccess(action),
            new PopupAction.Show('Action created, id #' + action.id)
          ]),
          catchError(error => of(showError(error)))
        )
    )
  );

  @Effect()
  updateOne$ = this.actions$.pipe(
    ofType<ActionAction.UpdateOne>(ActionAction.UPDATE_ONE),
    map(action => action.updateActionDto),
    switchMap(updateActionDto =>
      this.actionService
        .updateOne(updateActionDto)
        .pipe(
          switchMap(({ id, ...changes }) => [
            new ActionAction.UpdateOneSuccess({ id, changes }),
            new PopupAction.Show('Action updated')
          ]),
          catchError(error => of(showError(error)))
        )
    )
  );

  @Effect()
  deleteOne$ = this.actions$.pipe(
    ofType<ActionAction.DeleteOne>(ActionAction.DELETE_ONE),
    map(action => action.action.id),
    switchMap(id =>
      this.actionService
        .deleteOne(id)
        .pipe(
          map(() => String(id)),
          map(key => new ActionAction.DeleteOneSuccess(key)),
          catchError(error => of(showError(error)))
        )
    )
  );
}
