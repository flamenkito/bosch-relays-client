import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-popup',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnChanges {
  @Input() show: boolean;
  @Input() message: string;
  @Output() close = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.message && changes.message.currentValue !== null) {
      // reopen popup with a new message
      if (this.show) {
        setTimeout(() => {
          this.snackBar.dismiss();
        });
      }
      this.showPopup(this.message);
    }
  }

  showPopup(message: string) {
    setTimeout(() => {
      const ref = this.snackBar.open(this.message, null, {
        duration: 2000
      });
      ref.afterDismissed().subscribe(() => this.close.emit());
    });
  }
}
