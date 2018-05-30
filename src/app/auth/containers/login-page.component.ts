import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginUserDto } from '@app/auth/models';

import * as fromAuth from '@app/auth/reducers';
import { AuthAction } from '@app/auth/actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-card
      [pending]="pending$ | async"
      [errorInfo]="error$ | async"
      (submitted)="onSubmit($event)">
    </app-login-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  pending$ = this.store.select(fromAuth.selectLoginPagePending);
  error$ = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store<fromAuth.State>) {}

  onSubmit($event: LoginUserDto) {
    this.store.dispatch(new AuthAction.Login($event));
  }
}
