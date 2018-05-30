import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AbstractFormGroup } from '@app/shared/astract-form-group';

@Component({
  selector: 'app-cam-form-main',
  templateUrl: './cam-form-main.component.html'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamFormMainComponent extends AbstractFormGroup {
  @Input() parent: FormGroup;
}
