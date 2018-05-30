import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from '@app/auth/guards';

const routes: Routes = [
  { path: '', redirectTo: '/content', pathMatch: 'full' },
  {
    path: 'content',
    loadChildren: './content/content.module#ContentModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/content' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
