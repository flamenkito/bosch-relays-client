import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RelayModel, UpdateRelayDto } from '@app/content/models';
import { BaseModel } from '@app/shared/models';

@Component({
  selector: 'app-relay-form',
  template: `
<form [formGroup]="relayForm">
  <app-relay-form-main [parent]="relayForm">
    <app-group-header header="Relay">
      <button mat-fab color="primary"
        (click)="onUpdateRelay()"
        [disabled]="relayForm.pristine || relayForm.invalid">
        <mat-icon>save</mat-icon>
      </button>
    </app-group-header>
  </app-relay-form-main>
</form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelayFormComponent implements OnChanges {
  @Input() relay: RelayModel;
  @Output() updateRelay = new EventEmitter<UpdateRelayDto>();

  relayForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.relayForm = fb.group({
      id: null,
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  onUpdateRelay() {
    const relayChanges = BaseModel.getUpdates<RelayModel>(
      this.relayForm.value,
      this.relay,
      ['name', 'description'],
      {}
    );

    if (Object.keys(relayChanges).length > 0) {
      this.updateRelay.emit(relayChanges as UpdateRelayDto);
    }
  }

  ngOnChanges() {
    const { id, name, description } = this.relay;
    // on update success
    this.relayForm.reset({ id, name, description });
  }
}
