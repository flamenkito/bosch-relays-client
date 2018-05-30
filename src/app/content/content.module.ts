import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DragAndDropModule } from 'angular-draggable-droppable';

import { SharedModule } from '@app/shared/shared.module';
import { ContentRoutingModule } from '@app/content/content-routing.module';

import { guards } from '@app/content/guards';
import { services } from '@app/content/services';

import { containers } from '@app/content/containers';
import { components, entryComponents } from '@app/content/components';

import { reducers } from '@app/content/reducers';
import { effects } from '@app/content/effects';

import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DragAndDropModule.forRoot(),
    SharedModule,
    ContentRoutingModule,
    StoreModule.forFeature('content', reducers),
    EffectsModule.forFeature(effects)
  ],
  entryComponents,
  declarations: [...components, ...containers],
  providers: [
    ...guards,
    ...services,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class ContentModule {}
