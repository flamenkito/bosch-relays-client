import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskModel } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(getApi('task'));
  }

  upsertMany(tasks: Partial<TaskModel>[]): Observable<TaskModel[]> {
    return this.httpClient.patch<TaskModel[]>(getApi('task'), { tasks });
  }

  deleteMany(ids: number[]): Observable<void> {
    return this.httpClient.post<void>(getApi('task'), {
      tasks: ids.map(id => ({ id }))
    });
  }

  getOne(id: string): Observable<TaskModel> {
    return this.httpClient.get<TaskModel>(getApi('task', id));
  }
}
