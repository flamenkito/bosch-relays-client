import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActionTypeModel } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class ActionTypeService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ActionTypeModel[]> {
    return this.httpClient.get<ActionTypeModel[]>(getApi('type'));
  }
}
