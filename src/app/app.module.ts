import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from '@app/app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from '@app/core/containers';

import { environment } from '@env/environment';

import { reducers, metaReducers } from '@app/app/reducers';
import { effects } from '@app/app/effects';
import { CustomRouterStateSerializer } from '@app/app/reducers/router.reducer';

import { SharedModule } from '@shared/shared.module';
import { interceptors } from '@shared/interceptors';
import { services } from '@shared/services';

import { AuthModule } from '@app/auth/auth.module';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      name: '',
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    SharedModule.forRoot(),
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ...interceptors,
    ...services,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
