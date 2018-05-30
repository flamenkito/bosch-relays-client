import { RelayModel } from './relay.model';
import { ActionViewModel } from './action.view-model';

export interface RelayViewModel extends RelayModel {
  icon: string;
  actions: ActionViewModel[];
}
