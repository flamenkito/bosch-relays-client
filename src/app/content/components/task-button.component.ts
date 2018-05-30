import { Component, Input } from '@angular/core';

import { TaskModel } from '@app/content/models';

@Component({
  selector: 'app-task-button',
  template: `
    <button
      mat-raised-button color="primary"
      style="width: 100%;">
      {{ task.name }}
    </button>
  `
})
export class TaskButtonComponent {
  @Input() task: TaskModel;
}
