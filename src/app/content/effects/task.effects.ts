import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { TaskService } from '@app/content/services';
import { TaskAction } from '@app/content/actions';
import { PopupAction } from '@app/core/actions';
import { showError } from '@app/shared/show-error';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<TaskAction.LoadAll>(TaskAction.LOAD_ALL),
    switchMap(() =>
      this.taskService
        .getAll()
        .pipe(
          map(items => new TaskAction.LoadAllSuccess(items)),
          catchError(error => of(new TaskAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<TaskAction.LoadAllFailure>(TaskAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );

  @Effect()
  upsertMany$ = this.actions$.pipe(
    ofType<TaskAction.UpsertAll>(TaskAction.UPSERT_ALL),
    map(action => action.tasks),
    switchMap(tasks =>
      this.taskService.upsertMany(tasks).pipe(
        map(items =>
          items.map(({ id, ...changes }) => ({
            id,
            changes
          }))
        ),
        switchMap(items => [
          new TaskAction.UpsertAllSuccess(items),
          new PopupAction.Show('Cam updated')
        ]),
        catchError(error => of(showError(error)))
      )
    )
  );

  @Effect()
  deleteMany$ = this.actions$.pipe(
    ofType<TaskAction.DeleteAll>(TaskAction.DELETE_ALL),
    map(action => action.ids),
    switchMap(ids =>
      this.taskService
        .deleteMany(ids)
        .pipe(
          map(() => ids.map(id => String(id))),
          switchMap(keys => [
            new TaskAction.DeleteAllSuccess(keys),
            new PopupAction.Show('Cam updated')
          ]),
          catchError(error => of(showError(error)))
        )
    )
  );
}
