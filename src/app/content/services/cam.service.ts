import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CamModel, CreateCamDto } from '@app/content/models';
import { getApi } from '@shared/getApi';

@Injectable()
export class CamService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CamModel[]> {
    return this.httpClient.get<CamModel[]>(getApi('cam'));
  }

  getOne(id: string): Observable<CamModel> {
    return this.httpClient.get<CamModel>(getApi('cam', id));
  }

  createOne(createCamDto: CreateCamDto): Observable<CamModel> {
    return this.httpClient.post<CamModel>(getApi('cam'), createCamDto);
  }

  updateOne(updateCamDto: Partial<CamModel>): Observable<CamModel> {
    const { id, ...partial } = updateCamDto;
    return this.httpClient.patch<CamModel>(getApi('cam', id), partial);
  }

  deleteOne(id: number): Observable<void> {
    return this.httpClient.delete<void>(getApi('cam', id));
  }
}
