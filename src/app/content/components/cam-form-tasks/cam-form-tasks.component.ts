import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { AbstractFormGroup } from '@app/shared/astract-form-group';

@Component({
  selector: 'app-cam-form-tasks',
  templateUrl: './cam-form-tasks.component.html'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamFormTasksComponent extends AbstractFormGroup {
  @Input() parent: FormGroup;
  @Output() deleteTask = new EventEmitter<number>();

  get items() {
    const control = this.parent.get('tasks') as FormArray;
    return control.controls;
  }

  onDeleteTask(index: number) {
    this.deleteTask.emit(index);
  }
}
