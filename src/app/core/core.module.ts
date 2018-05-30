import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@app/material';

import { containers } from '@app/core/containers';
import { components } from '@app/core/components';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, SharedModule, MaterialModule],
  declarations: [...components, ...containers],
  exports: [...components, ...containers]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded in AppModule');
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
