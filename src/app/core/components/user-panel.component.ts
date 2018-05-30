import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoggedUserModel } from '@app/auth/models';

@Component({
  selector: 'app-user-panel',
  template: `
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{ loggedUser?.name }}
          </mat-panel-title>
          <mat-panel-description>
            {{ loggedUser?.email }}
          </mat-panel-description>
        </mat-expansion-panel-header>

        <pre>
          {{ loggedUser | json }}
        </pre>

      </mat-expansion-panel>
    </mat-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {
  @Input() loggedUser: LoggedUserModel;
}
