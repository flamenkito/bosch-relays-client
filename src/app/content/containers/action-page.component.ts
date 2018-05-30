import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';

import {
  ActionViewModel,
  RelayViewModel,
  CamViewModel
} from '@app/content/models';

@Component({
  selector: 'app-main-page',
  template: `
    <app-action-selector
      [actionModels]="actionModelArray$ | async"
      [camModels]="camModelArray$ | async"
      [relayModels]="relayModelArray$ | async">
    </app-action-selector>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionPageComponent {
  actionModelArray$: Observable<ActionViewModel[]>;
  camModelArray$: Observable<CamViewModel[]>;
  relayModelArray$: Observable<RelayViewModel[]>;

  constructor(private store: Store<fromContent.State>) {
    this.actionModelArray$ = store.select(fromContent.selectActionModels);
    this.camModelArray$ = store.select(fromContent.selectCamModels);
    this.relayModelArray$ = store.select(fromContent.selectRelayModels);
  }
}
