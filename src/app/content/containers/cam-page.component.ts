import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromContent from '@app/content/reducers';
import { CamAction, TaskAction } from '@app/content/actions';
import { CamModel, TaskModel } from '@app/content/models';

@Component({
  selector: 'app-cam-page',
  template: `
    <app-group-header header="Cams">
      <button (click)="onCreateCam()"
        mat-fab color="primary">
        <mat-icon>add</mat-icon>
      </button>
    </app-group-header>
    <app-cam-list
      [cams]="camArray$ | async"
      [tasks]="taskArray$ | async"
      (selectCam)="onSelectCam($event)"
      (selectTask)="onSelectTask($event)">
    </app-cam-list>
  `,
})
export class CamPageComponent {
  camArray$: Observable<CamModel[]>;
  taskArray$: Observable<TaskModel[]>;

  constructor(private store: Store<fromContent.State>) {
    this.camArray$ = store.select(fromContent.selectCamArray);
    this.taskArray$ = store.select(fromContent.selectTaskArray);
  }

  onCreateCam() {
    this.store.dispatch(new CamAction.CreateOne(CamModel.createDefault()));
  }

  onSelectCam(cam: CamModel) {
    this.store.dispatch(new CamAction.SelectOne(cam.id));
  }

  onSelectTask(task: TaskModel) {
    this.store.dispatch(new TaskAction.SelectOne(task.id));
  }
}
