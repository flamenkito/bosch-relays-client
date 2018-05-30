import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  TaskModel,
  RelayModel,
  ActionViewModel,
  RelayViewModel,
  CamViewModel
} from '@app/content/models';
import { MatDialog } from '@angular/material';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSelectorComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  private taskState: TaskStateModel = {};
  private relayState: RelayStateModel = {};

  @Input() actionModels: ActionViewModel[];
  @Input() camModels: CamViewModel[];
  @Input() relayModels: RelayViewModel[];

  constructor(private dialog: MatDialog) {}

  onSelectAction(model: Partial<ActionViewModel>) {
    this.dialog.open(ActionDialogComponent, {
      data: { model }
    });
  }

  getDropData(cam: CamViewModel, task: TaskModel): DropDataModel {
    return { cam, task };
  }

  getTaskState(task: TaskModel) {
    if (!this.taskState[task.id]) {
      this.taskState = {
        ...this.taskState,
        [task.id]: {
          dragActive: false
        }
      };
    }
    return this.taskState[task.id];
  }

  getRelayState(relay: RelayModel) {
    if (!this.relayState[relay.id]) {
      this.relayState = {
        ...this.relayState,
        [relay.id]: {
          dropOverActive: false,
          droppedData: {}
        }
      };
    }
    return this.relayState[relay.id];
  }

  getTaskZIndex(task: TaskModel): number {
    return this.getTaskState(task).dragActive ? 2 : 1;
  }

  onDragStart(task: TaskModel) {
    this.getTaskState(task).dragActive = true;
  }

  onDragEnd(task: TaskModel) {
    this.getTaskState(task).dragActive = false;
  }

  onDrop(
    { dropData: { cam, task } }: { dropData: DropDataModel },
    relay: RelayModel
  ) {
    const relayState = this.getRelayState(relay);
    relayState.dropOverActive = false;
    this.onSelectAction(ActionViewModel.createPartial(cam, task, relay));
  }
}

interface DropDataModel {
  cam: CamViewModel;
  task: TaskModel;
}

interface TaskStateModel {
  [key: string]: {
    dragActive: boolean;
  };
}

interface RelayStateModel {
  [key: string]: {
    dropOverActive: boolean;
    droppedData: DropDataModel;
  };
}
