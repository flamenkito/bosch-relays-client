import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { RouterAction } from '@app/app/actions';
import { CamService } from '@app/content/services';
import { CamAction } from '@app/content/actions';
import { PopupAction } from '@app/core/actions';
import { showError } from '@app/shared/show-error';

@Injectable()
export class CamEffects {
  constructor(
    private actions$: Actions,
    private camService: CamService
  ) {}

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType<CamAction.LoadAll>(CamAction.LOAD_ALL),
    switchMap(() =>
      this.camService
        .getAll()
        .pipe(
          map(items => new CamAction.LoadAllSuccess(items)),
          catchError(error => of(new CamAction.LoadAllFailure(error)))
        )
    )
  );

  @Effect()
  loadAllFailure$ = this.actions$.pipe(
    ofType<CamAction.LoadAllFailure>(CamAction.LOAD_ALL_FAILURE),
    switchMap(action => [showError(action.error)])
  );

  @Effect()
  selectOne$ = this.actions$.pipe(
    ofType<CamAction.SelectOne>(CamAction.SELECT_ONE),
    map(action => action.camId),
    map(camId => new RouterAction.Go(['/content', 'cams', String(camId)]))
  );

  @Effect()
  createOne$ = this.actions$.pipe(
    ofType<CamAction.CreateOne>(CamAction.CREATE_ONE),
    map(action => action.createCamDto),
    switchMap(createCamDto =>
      this.camService
        .createOne(createCamDto)
        .pipe(
          switchMap(cam => [
            new CamAction.CreateOneSuccess(cam),
            new PopupAction.Show('Cam created, id #' + cam.id)
          ]),
          catchError(error => of(showError(error)))
        )
    )
  );

  @Effect()
  updateOne$ = this.actions$.pipe(
    ofType<CamAction.UpdateOne>(CamAction.UPDATE_ONE),
    map(action => action.updateCamDto),
    switchMap(updateCamDto =>
      this.camService
        .updateOne(updateCamDto)
        .pipe(
          switchMap(({ id, ...changes }) => [
            new CamAction.UpdateOneSuccess({ id, changes }),
            new PopupAction.Show('Cam updated')
          ]),
          catchError(error => of(showError(error)))
        )
    )
  );

  @Effect()
  deleteOne$ = this.actions$.pipe(
    ofType<CamAction.DeleteOne>(CamAction.DELETE_ONE),
    map(action => action.id),
    switchMap(id =>
      this.camService
        .deleteOne(id)
        .pipe(
          map(() => String(id)),
          map(key => new CamAction.DeleteOneSuccess(key)),
          catchError(error => of(showError(error)))
        )
    )
  );

  @Effect()
  deleteOneSuccess$ = this.actions$.pipe(
    ofType<CamAction.DeleteOneSuccess>(CamAction.DELETE_ONE_SUCCESS),
    switchMap(() => [
      new RouterAction.Go(['/content', 'cams']),
      new PopupAction.Show('Cam deleted')
    ])
  );
}
