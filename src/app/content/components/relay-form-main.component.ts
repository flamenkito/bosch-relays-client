import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AbstractFormGroup } from '@app/shared/astract-form-group';

@Component({
  selector: 'app-relay-form-main',
  template: `
<ng-content></ng-content>
<mat-card>
  <div [formGroup]="parent">
    <mat-form-field>
      <input matInput placeholder="Name"
        formControlName="name">
      <mat-error *ngIf="hasError('name')">
        {{ errorMessage('name') }}
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="Description"
        formControlName="description">
      <mat-error *ngIf="hasError('description')">
        {{ errorMessage('description') }}
      </mat-error>
    </mat-form-field>
  </div>
</mat-card>
    `
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelayFormMainComponent extends AbstractFormGroup {
  @Input() parent: FormGroup;
}
