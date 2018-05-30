import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-dashboard-sync',
  templateUrl: './dashboard-sync.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSyncComponent {
  @Input() icon: string;
  @Input() pong: Date;
  @Output() sync = new EventEmitter();

  message = 'Manually synchronize state';

  getSyncColor() {
    switch (this.icon) {
      case 'ok':
        return 'primary';
      case 'error':
        return 'warn';
      default:
        return 'default';
    }
  }

  onSync() {
    this.sync.emit();
  }
}
