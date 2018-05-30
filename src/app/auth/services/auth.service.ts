import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LoginUserDto, TokenModel, LoggedUserModel } from '@app/auth/models';
import { getApi } from '@app/shared/getApi';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login({ username, password }: LoginUserDto): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(getApi('auth', 'login'), {
      username,
      password
    });
  }

  loggedUser(): Observable<LoggedUserModel> {
    return this.httpClient.get<LoggedUserModel>(getApi('user'));
  }

  logout() {
    return of(true);
  }
}
