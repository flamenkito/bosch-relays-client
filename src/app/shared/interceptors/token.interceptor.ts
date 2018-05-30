import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';



import * as fromAuth from '@app/auth/reducers';
import { TokenModel } from '@app/auth/models';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token$: Observable<TokenModel>;

  constructor(private store: Store<fromAuth.State>) {
    this.token$ = store.select(fromAuth.selectToken);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.token$.pipe(
      take(1),
      map(
        token =>
          token
            ? request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token.access_token}`
                }
              })
            : request
      ),
      switchMap(req => next.handle(req))
    );
  }
}
