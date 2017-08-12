import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class NotificationService {
  static get parameters(){
    return [Http]
  }
  constructor(Http){
    this.http = Http;
    this.notifications = [];
  }
  addNotice( notice ){
    this.notifications.push( notice );
  }
  getAll(){
    return this.notifications;
  }
  clearAll(){
    this.notifications = [];
  }
}