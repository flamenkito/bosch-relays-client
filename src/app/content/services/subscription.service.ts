import { Injectable } from '@angular/core';
import { Observable, Observer, merge } from 'rxjs';

import * as io from 'socket.io-client';
import { environment } from '@env/environment';
import { ValueUpdateModel } from '@app/content/models';
import { map } from 'rxjs/operators';
import {
  ActionAction,
  RelayAction,
  TaskAction,
  SubscriptionAction
} from '@app/content/actions';

type Socket = any;

@Injectable()
export class SubscriptionService {
  subscribe(): Observable<Socket> {
    return Observable.create((observer: Observer<Socket>) => {
      const socket = io(environment.api);
      const action$ = merge(
        fromSocketEvent(
          socket,
          'action-update',
          ActionAction.UpdateOneSuccess,
          data => ValueUpdateModel.fromData(data)
        ),
        fromSocketEvent(
          socket,
          'relay-update',
          RelayAction.UpdateOneSuccess,
          data => ValueUpdateModel.fromData(data)
        ),
        fromSocketEvent(
          socket,
          'task-update',
          TaskAction.UpdateOneSuccess,
          data => ValueUpdateModel.fromData(data)
        ),
        fromSocketEvent(socket, 'ping', SubscriptionAction.Ping),
        fromSocketEvent(socket, 'pong', SubscriptionAction.Pong),
      );
      socket.on('connect', () => {
        socket.emit('subscribe-updates', {});
        observer.next(action$);
      });
      return () => socket.disconnect();
    });
  }
}

const fromSocketEvent = (
  socket,
  event: string,
  action,
  mapper: (data: any) => any = null
) => {
  return Observable.create($ => socket.on(event, data => $.next(data))).pipe(
    map(data => {
      if (mapper) {
        return new action(mapper(data));
      } else {
        return new action();
      }
    })
  );
};
