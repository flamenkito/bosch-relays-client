import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardViewModel } from '@app/content/models';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  @Input() models: DashboardViewModel[];
}
