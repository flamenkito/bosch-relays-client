import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RelayModel } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class RelayService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RelayModel[]> {
    return this.httpClient.get<RelayModel[]>(getApi('relay'));
  }

  getOne(id: string): Observable<RelayModel> {
    return this.httpClient.get<RelayModel>(getApi('relay', id));
  }

  updateOne(updateRelayDto: Partial<RelayModel>): Observable<RelayModel> {
    const { id, ...partial } = updateRelayDto;
    return this.httpClient.patch<RelayModel>(getApi('relay', id), partial);
  }
}
