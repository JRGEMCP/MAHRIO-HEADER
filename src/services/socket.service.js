import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class SocketService {
  constructor(){
    this.socket = io( );
  }

  getMessages(){
    let observable = new Observable( observer => {
      this.socket.connect();
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}

