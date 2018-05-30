import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
<ng-content select="mat-toolbar"></ng-content>
<mat-sidenav-container
  (backdropClick)="onClose()">
  <mat-sidenav *ngIf="visible"
    [fixedInViewport]="false"
    [fixedTopGap]="0"
    [fixedBottomGap]="0"
    [opened]="opened || !mobile"
    (keydown.escape)="onClose()"
    [mode]="mobile ? 'push' : 'side'">

    <mat-nav-list>
      <app-nav-item
        (navigate)="onClose()"
        routerLink="/content"
        icon="dashboard"
        hint="Application dashboard">
        Dashboard
      </app-nav-item>
      <app-nav-item
        (navigate)="onClose()"
        routerLink="/content/cams"
        icon="videocam"
        hint="Cams editor">
        Cams
      </app-nav-item>
      <app-nav-item
        (navigate)="onClose()"
        routerLink="/content/relays"
        icon="settings_remote"
        hint="Relays editor">
        Relays
      </app-nav-item>
      <app-nav-item
        (navigate)="onClose()"
        routerLink="/content/actions"
        icon="swap_horiz"
        hint="Actions editor">
        Actions
      </app-nav-item>
      <app-nav-item
        (navigate)="onClose()"
        routerLink="/content/events"
        icon="list"
        hint="Events list">
        Events
      </app-nav-item>
      <app-nav-item
        (navigate)="onLogout()">
        Logout
      </app-nav-item>
    </mat-nav-list>

  </mat-sidenav>

  <mat-sidenav-content>
    <ng-content></ng-content>
  </mat-sidenav-content>
</mat-sidenav-container>
  `,
  styles: [
    `
mat-sidenav {
  width: 300px;
}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  @Input() visible: boolean;
  @Input() opened: boolean;
  @Input() mobile: boolean;
  @Output() close = new EventEmitter();
  @Output() logout = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
