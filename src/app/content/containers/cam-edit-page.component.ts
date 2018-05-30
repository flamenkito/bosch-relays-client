import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';
import { CamAction, TaskAction } from '@app/content/actions';
import {
  CamModel,
  TaskModel,
  UpdateCamDto,
  UpsertTaskDto
} from '@app/content/models';

@Component({
  selector: 'app-cam-edit-page',
  template: `
    <app-cam-form
      [cam]="selectedCam$ | async"
      [tasks]="camTaskArray$ | async"
      (hasChanges)="onHasChanges($event)"
      (updateCam)="onUpdateCam($event)"
      (deleteCam)="onDeleteCam($event)"
      (updateTasks)="onUpdateTasks($event)"
      (deleteTasks)="onDeleteTasks($event)">
    </app-cam-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamEditPageComponent {
  selectedCam$: Observable<CamModel>;
  camTaskArray$: Observable<TaskModel[]>;
  hasUnsavedChanges = false;

  constructor(private store: Store<fromContent.State>) {
    this.selectedCam$ = store.select(fromContent.selectedCam);
    this.camTaskArray$ = store.select(fromContent.selectedCamTaskArray);
  }

  onHasChanges(hasChanges: boolean) {
    this.hasUnsavedChanges = hasChanges;
  }

  onUpdateCam(updateCamDto: UpdateCamDto) {
    this.store.dispatch(new CamAction.UpdateOne(updateCamDto));
  }

  onDeleteCam(id: number) {
    this.store.dispatch(new CamAction.DeleteOne(id));
  }

  onUpdateTasks(upsertTaskDtoArray: UpsertTaskDto[]) {
    this.store.dispatch(new TaskAction.UpsertAll(upsertTaskDtoArray));
  }

  onDeleteTasks(ids: number[]) {
    this.store.dispatch(new TaskAction.DeleteAll(ids));
  }
}
