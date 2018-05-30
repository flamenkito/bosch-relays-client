import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';
import { EventViewModel } from '@app/content/models';

@Component({
  selector: 'app-event-page',
  template: `
    <app-event-list
      [models]="eventModelArray$ | async">
    </app-event-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPageComponent {
  eventModelArray$: Observable<EventViewModel[]>;

  constructor(private store: Store<fromContent.State>) {
    this.eventModelArray$ = store.select(fromContent.selectEventModels);
  }
}
