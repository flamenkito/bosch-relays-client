import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as fromContent from '@app/content/reducers';

import {
  ActionTypeModel,
  ActionModel,
  ActionViewModel
} from '@app/content/models';
import { ActionAction } from '@app/content/actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent {
  actionForm: FormGroup;

  actionTypeArray$: Observable<ActionTypeModel[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      model: Partial<ActionViewModel>;
    },
    private store: Store<fromContent.State>
  ) {
    this.actionTypeArray$ = store.select(fromContent.selectActionTypeArray);

    this.actionForm = this.fb.group({
      id: [null, []],
      taskId: [null, [Validators.required]],
      relayId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      actionTypeId: [null, [Validators.required]],
      actionDelay: [null, [Validators.required]],
      pulseTime: [null, []]
    });
    this.actionForm.patchValue(data.model);
  }

  onUpsertAction() {
    const action = { ...this.actionForm.value };
    if (action.id) {
      this.store.dispatch(new ActionAction.UpdateOne(action));
    } else {
      this.store.dispatch(new ActionAction.CreateOne(action));
    }
    this.dialogRef.close();
  }

  onDeleteAction() {
    const action = { ...this.actionForm.value };
    this.store.dispatch(new ActionAction.DeleteOne(action));
    this.dialogRef.close(action);
  }
}
