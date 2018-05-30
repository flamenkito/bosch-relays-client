import { CamModel } from './cam.model';
import { TaskModel } from './task.model';

export interface CamViewModel extends CamModel {
  tasks: TaskModel[];
}
