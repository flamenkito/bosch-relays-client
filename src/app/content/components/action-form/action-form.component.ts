import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActionTypeModel } from '@app/content/models';
import { AbstractFormGroup } from '@app/shared/astract-form-group';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFormComponent extends AbstractFormGroup {
  @Input() parent: FormGroup;
  @Input() actionTypes: ActionTypeModel[];

  get selected() {
    const control = this.parent.get('actionTypeId');
    return !!control.value;
  }

  get icon() {
    const control = this.parent.get('actionTypeId');
    const actionTypeId = this.actionTypes.find(item => item.id === control.value);
    return ActionTypeModel.getImage(actionTypeId);
  }

  getImage(type: ActionTypeModel) {
    return ActionTypeModel.getImage(type);
  }
}
