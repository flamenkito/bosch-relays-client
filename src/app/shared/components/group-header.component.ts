import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-group-header',
  template: `
    <div class="row mt-3 mb-2"
      [ngClass]="animateOnRouteEnter">
      <div class="col">
        <h3>{{ header }}</h3>
        {{ info ? info : header }}
      </div>
      <div class="d-flex justify-content-end mr-3">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupHeaderComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  @Input() header: string;
  @Input() info: string;
}
