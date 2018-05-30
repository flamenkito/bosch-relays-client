import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';

import {
  CamModel,
  TaskModel,
  UpdateCamDto,
  UpsertTaskDto
} from '@app/content/models';
import { BaseModel } from '@app/shared/models';
import { TaskValidators } from '@app/content/validators';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cam-form',
  templateUrl: './cam-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamFormComponent implements OnDestroy, OnChanges {
  @Input() cam: CamModel;
  @Input() tasks: TaskModel[];
  @Output() hasChanges = new EventEmitter<boolean>();
  @Output() updateCam = new EventEmitter<UpdateCamDto>();
  @Output() deleteCam = new EventEmitter<number>();
  @Output() updateTasks = new EventEmitter<UpsertTaskDto[]>();
  @Output() deleteTasks = new EventEmitter<number[]>();

  camForm: FormGroup;
  subscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.camForm = fb.group({
      id: null,
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      ip: [null, [Validators.required]],
      tasks: fb.array([]),
      tasksRemove: [],
      enabled: [false, []]
    });

    const formDirty$: Observable<boolean> = Observable.create($ => {
      // a workaround to get updated form.dirty: form.valueChanges or
      // form.statusChanges emits BEFORE form.dirty update.
      const handler = setTimeout(() => {
        $.next(this.camForm.dirty);
      }, 0);
      return () => clearTimeout(handler);
    });

    const hasUnsavedChanges$ = this.camForm.statusChanges.pipe(
      switchMap(() => formDirty$),
      distinctUntilChanged()
    );

    this.subscription = hasUnsavedChanges$.subscribe(status =>
      this.hasChanges.emit(status)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes) {
    const { id, name, description, ip, enabled } = this.cam;
    // on update success
    this.camForm.reset({ id, name, description, ip, enabled });
    // remove all tasks
    const tasksGroup = this.camForm.get('tasks') as FormArray;
    while (tasksGroup.length > 0) {
      tasksGroup.removeAt(0);
    }
    // create tasks
    this.tasks.forEach(task => this.onAddTask(task));

    this.camForm.markAsPristine();
  }

  createTask(task: Partial<TaskModel>) {
    const { id, position, name, description, enabled } = task;
    const camId = this.cam.id;
    return this.fb.group({
      id,
      position: [position, [Validators.required, TaskValidators.checkPosition]],
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
      enabled: [enabled, []],
      camId
    });
  }

  private updateTasksGroupState() {
    const tasksGroup = this.camForm.get('tasks') as FormArray;
    const taskChanges = BaseModel.getUpdatesArray(
      tasksGroup.value,
      this.tasks,
      ['id', 'name', 'description', 'position', 'enabled'],
      {}
    );
    const taskDeletes = BaseModel.getDeletedArray(tasksGroup.value, this.tasks);
    // form state changes
    if (Object.keys([...taskChanges, ...taskDeletes]).length > 0) {
      tasksGroup.markAsTouched();
      tasksGroup.markAsDirty();
    } else {
      tasksGroup.markAsPristine();
    }
  }

  onAddTask(task: Partial<TaskModel>) {
    const tasksGroup = this.camForm.get('tasks') as FormArray;
    tasksGroup.push(this.createTask(task));
    this.updateTasksGroupState();
  }

  onCreateTask() {
    this.onAddTask(TaskModel.createDefault(this.cam.id));
  }

  onDeleteTask(index: number) {
    const tasksGroup = this.camForm.get('tasks') as FormArray;
    const taskId = tasksGroup.at(index).value.id;
    // mark for deletion
    if (taskId) {
      const tasksRemove = this.camForm.get('tasksRemove') as FormControl;
      tasksRemove.setValue([taskId].concat(...tasksRemove.value));
    }
    tasksGroup.removeAt(index);
    this.updateTasksGroupState();
  }

  onUpdateCam() {
    // cam
    const camChanges = BaseModel.getUpdates<CamModel>(
      this.camForm.value,
      this.cam,
      ['name', 'description', 'ip', 'enabled'],
      {}
    );
    // tasks
    const tasksGroup = this.camForm.get('tasks') as FormArray;
    const camId = this.cam.id;
    const taskChanges = BaseModel.getUpdatesArray(
      tasksGroup.value,
      this.tasks,
      ['name', 'description', 'position', 'enabled'],
      { camId }
    );
    // tasks
    const tasksRemove = this.camForm.get('tasksRemove') as FormControl;

    // update cam
    if (Object.keys(camChanges).length > 0) {
      this.updateCam.emit(camChanges as UpdateCamDto);
    }
    // upsert tasks
    if (taskChanges.length > 0) {
      this.updateTasks.emit(taskChanges as UpsertTaskDto[]);
    }
    // delete tasks
    if (tasksRemove.value) {
      this.deleteTasks.emit(tasksRemove.value);
    }
  }

  onDeleteCam() {
    this.deleteCam.emit(this.cam.id);
  }
}
