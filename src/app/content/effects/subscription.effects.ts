import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { SubscriptionAction } from '@app/content/actions';
import { showError } from '@app/shared/show-error';

import { SubscriptionService } from '@app/content/services';
import { PopupAction } from '@app/core/actions';

@Injectable()
export class SubscriptionEffects {
  constructor(
    private actions$: Actions,
    private subscriptionService: SubscriptionService
  ) {}

  @Effect()
  subscribe$ = this.actions$.pipe(
    ofType<SubscriptionAction.Subscribe>(SubscriptionAction.SUBSCRIBE),
    switchMap(() =>
      this.subscriptionService
        .subscribe()
        .pipe(
          switchMap(stream$ => [
            new SubscriptionAction.SubscribeSuccess(stream$),
            // new PopupAction.Show('Subscribed'),
          ]),
          catchError(error =>
            of(new SubscriptionAction.SubscribeFailure(error))
          )
        )
    )
  );

  @Effect()
  subscribeSuccess$ = this.actions$.pipe(
    ofType<SubscriptionAction.SubscribeSuccess>(
      SubscriptionAction.SUBSCRIBE_SUCCESS
    ),
    switchMap(action => action.stream$)
  );

  @Effect()
  subscribeFailure$ = this.actions$.pipe(
    ofType<SubscriptionAction.SubscribeFailure>(
      SubscriptionAction.SUBSCRIBE_FAILURE
    ),
    switchMap(action => [showError(action.error)])
  );
}
