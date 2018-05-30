import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ActionViewModel } from '@app/content/models';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent {
  @Input() model: ActionViewModel;

  get source() {
    return this.model.task.name;
  }
}
