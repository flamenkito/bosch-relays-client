import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { preloaders, CamEditPageGuard } from './guards';
import { AuthGuard } from '@app/auth/guards';

const routes: Routes = [
  {
    path: 'cams',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':camId',
        canActivate: [...preloaders],
        // canDeactivate: [CamEditPageGuard],
        component: fromContainers.CamEditPageComponent
      },
      {
        path: '',
        canActivate: [...preloaders],
        component: fromContainers.CamPageComponent
      }
    ]
  },
  {
    path: 'relays',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':relayId',
        canActivate: [...preloaders],
        component: fromContainers.RelayEditPageComponent
      },
      {
        path: '',
        canActivate: [...preloaders],
        component: fromContainers.RelayPageComponent
      }
    ]
  },
  {
    path: 'actions',
    canActivate: [...preloaders],
    component: fromContainers.ActionPageComponent
  },
  {
    path: 'events',
    canActivate: [...preloaders],
    component: fromContainers.EventPageComponent
  },
  {
    path: '',
    canActivate: [...preloaders],
    component: fromContainers.DashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
