import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EventModel } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(getApi('event'));
  }
}
