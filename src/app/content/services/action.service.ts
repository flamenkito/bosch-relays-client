import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActionModel, CreateActionDto } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class ActionService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ActionModel[]> {
    return this.httpClient.get<ActionModel[]>(getApi('action'));
  }

  createOne(createActionDto: CreateActionDto): Observable<ActionModel> {
    return this.httpClient.post<ActionModel>(getApi('action'), createActionDto);
  }

  updateOne(updateActionDto: Partial<ActionModel>): Observable<ActionModel> {
    const { id, ...partial } = updateActionDto;
    return this.httpClient.patch<ActionModel>(getApi('action', id), partial);
  }

  deleteOne(id: number): Observable<void> {
    return this.httpClient.delete<void>(getApi('action', id));
  }
}
