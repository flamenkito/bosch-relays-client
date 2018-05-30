import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { CamModel, TaskModel } from '@app/content/models';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-cam-list',
  templateUrl: './cam-list.component.html',
  styleUrls: ['./cam-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamListComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  @Input() cams: CamModel[];
  @Input() tasks: TaskModel[];
  @Output() selectCam = new EventEmitter<CamModel>();
  @Output() selectTask = new EventEmitter<TaskModel>();

  getAvatar(cam: CamModel) {
    if (cam.synchronized) {
      return '/assets/ok.png';
    } else {
      return '/assets/error.png';
    }
  }

  getTasks(cam: CamModel) {
    return this.tasks.filter(task => task.camId === cam.id);
  }

  onSelectCam(cam: CamModel) {
    this.selectCam.emit(cam);
  }

  onSelectTask(task: TaskModel) {
    this.selectTask.emit(task);
  }
}
