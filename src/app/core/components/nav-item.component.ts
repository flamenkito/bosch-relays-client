import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
<a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()">
  <mat-icon mat-list-icon>{{ icon }}</mat-icon>
  <span mat-line>
    <ng-content></ng-content>
  </span>
  <span mat-line class="secondary">{{ hint }}</span>
</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
