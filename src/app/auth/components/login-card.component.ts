import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

import { LoginUserDto } from '@app/auth/models';
import { environment } from '@env/environment';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-login-card',
  template: `
    <div class="row align-items-center justify-content-center login-row"[ngClass]="animateOnRouteEnter">
      <div class="col login-col">
        <mat-progress-bar *ngIf="isPending" mode="indeterminate"></mat-progress-bar>
        <mat-card>
          <mat-card-title class="text-center">
            Login
          </mat-card-title>
          <mat-card-content>
            <app-login-form
              [parent]="loginForm"
              (submit)="submit()">
              <div *ngIf="errorInfo" class="alert alert-danger" role="alert">
                {{ errorInfo }}
              </div>
            </app-login-form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
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
export class LoginCardComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  isPending = false;

  @Input()
  set pending(isPending: boolean) {
    this.isPending = isPending;
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }
  @Input() errorInfo: string | null;
  @Output() submitted = new EventEmitter<LoginUserDto>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [environment.login.username, [Validators.required]],
      password: [environment.login.password, [Validators.required]]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }
}
