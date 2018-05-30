import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';
import { DashboardViewModel } from '@app/content/models';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <app-group-header header="Actions">
      <app-dashboard-sync
        [icon]="icon$ | async"
        [pong]="pong$ | async"
        (sync)="onSync()">
      </app-dashboard-sync>
    </app-group-header>
    <app-dashboard
      [models]="dashboardViewModelArray$ | async">
    </app-dashboard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  icon$: Observable<string>;
  pong$: Observable<Date>;
  dashboardViewModelArray$: Observable<DashboardViewModel[]>;

  constructor(private store: Store<fromContent.State>) {
    this.icon$ = store.select(fromContent.selectSubscriptionIcon);
    this.pong$ = store.select(fromContent.selectSubscriptionPong);
    this.dashboardViewModelArray$ = store.select(fromContent.selectDashboardModels);
  }

  onSync() {
    console.log('onSync');
  }
}
