import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';
import { RelayAction } from '@app/content/actions';
import { RelayModel, UpdateRelayDto } from '@app/content/models';

@Component({
  selector: 'app-relay-edit-page',
  template: `
    <app-relay-form
      [relay]="selectedRelay$ | async"
      (updateRelay)="onUpdateRelay($event)">
    </app-relay-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelayEditPageComponent {
  selectedRelay$: Observable<RelayModel>;

  constructor(private store: Store<fromContent.State>) {
    this.selectedRelay$ = store.select(fromContent.selectedRelay);
  }

  onUpdateRelay(updateRelayDto: UpdateRelayDto) {
    this.store.dispatch(new RelayAction.UpdateOne(updateRelayDto));
  }
}
