import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { RelayViewModel } from '@app/content/models';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-relay-list',
  templateUrl: './relay-list.component.html',
  styleUrls: ['./relay-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelayListComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  @Input() models: RelayViewModel[];
  @Output() selectRelay = new EventEmitter<RelayViewModel>();

  onSelectModel(model: RelayViewModel) {
    this.selectRelay.emit(model);
  }
}
