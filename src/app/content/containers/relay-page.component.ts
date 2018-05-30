import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';

import { RelayModel, RelayViewModel } from '@app/content/models';
import { RelayAction } from '@app/content/actions';

@Component({
  selector: 'app-relay-page',
  template: `
    <app-group-header header="Relays">
    </app-group-header>
    <app-relay-list
      [models]="relayModelArray$ | async"
      (selectRelay)="onSelectRelay($event)">
    </app-relay-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelayPageComponent {
  relayModelArray$: Observable<RelayViewModel[]>;

  constructor(private store: Store<fromContent.State>) {
    this.relayModelArray$ = store.select(fromContent.selectRelayModels);
  }

  onSelectRelay(relay: RelayModel) {
    this.store.dispatch(new RelayAction.SelectOne(relay.id));
  }
}
