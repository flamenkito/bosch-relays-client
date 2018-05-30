import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AbstractFormGroup } from '@app/shared/astract-form-group';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="parent">
      <p>
        <mat-form-field class="w-100">
          <input type="text" matInput placeholder="Username"
            formControlName="username">
          <mat-error *ngIf="hasError('username')">
            {{ errorMessage('username') }}
          </mat-error>
        </mat-form-field>
      </p>
      <p>
        <mat-form-field class="w-100">
          <input type="password" matInput placeholder="Password"
            formControlName="password">
          <mat-error *ngIf="hasError('password')">
            {{ errorMessage('password') }}
          </mat-error>
        </mat-form-field>
      </p>
      <ng-content></ng-content>
      <div>
        <button class="btn btn-primary btn-block" (click)="onSubmit()">Login</button>
      </div>
    </form>
  `,
  styles: [
    `
    .login-row {
      min-height: 62vh;
    }
    .login-col {
      max-width: 300px;
      min-width: 200px;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent extends AbstractFormGroup {
  @Input() parent: FormGroup;
  @Output() submit = new EventEmitter();

  onSubmit() {
    this.submit.emit();
  }
}
