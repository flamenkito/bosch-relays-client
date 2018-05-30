import { AbstractControl } from '@angular/forms';

export class TaskValidators {
  static checkPosition(control: AbstractControl) {
    const position = Number.isInteger(control.value) && Number.parseInt(control.value, 10);
    if (!position || position < 1 || position > 16) {
      return { invalidPosition: true };
    }
    return null;
  }
}
