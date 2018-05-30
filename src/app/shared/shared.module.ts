import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material';

import { components } from '@app/shared/components';
import { containers } from '@app/shared/containers';
import { pipes } from '@app/shared/pipes';
// import { services } from '@app/shared/services';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [...components, ...containers, ...pipes],
  exports: [...components, ...containers, ...pipes]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
