import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

const messages = {
  required: 'This field is required.',
  invalidPosition: 'A number from 1 to 16.'
};

export abstract class AbstractFormGroup {
  @Input() parent: FormGroup;

  hasError(first: string | number, ...params): boolean {
    const control = this.parent.get([first, ...params]);
    return control && !!control.errors;
  }

  errorMessage(first: string | number, ...params): string {
    const control = this.parent.get([first, ...params]);
    if (control && control.errors === null) {
      return null;
    }
    const errors = Object.keys(control.errors);
    const error = errors.pop();
    return messages[error] || `Error: ${error}`;
  }
}
