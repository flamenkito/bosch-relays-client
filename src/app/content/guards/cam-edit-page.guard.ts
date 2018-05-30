import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CamEditPageComponent } from '@app/content/containers';

@Injectable()
export class CamEditPageGuard implements CanDeactivate<CamEditPageComponent> {
  canDeactivate(component: CamEditPageComponent): Observable<boolean> {
    if (component.hasUnsavedChanges) {
      const result = window.confirm(
        'This page has unsaved data, are you shure you want to leave it?'
      );
      return of(result);
    } else {
      return of(true);
    }
  }
}
