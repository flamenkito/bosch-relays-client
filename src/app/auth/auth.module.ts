import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@app/material';

import { reducers } from '@app/auth/reducers';
import { effects } from '@app/auth/effects';

import { guards } from '@app/auth/guards';
import { components } from '@app/auth/components';
import { containers } from '@app/auth/containers';
import { services } from '@app/auth/services';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [...containers, ...components],
  exports: [...containers, ...components]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [...guards, ...services]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
    AuthRoutingModule
  ]
})
export class RootAuthModule {}
