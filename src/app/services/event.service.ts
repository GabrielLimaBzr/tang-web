import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }


  private postDeletedSource = new Subject<void>();

  postDeleted$ = this.postDeletedSource.asObservable();

  notifyPostDeleted() {
    this.postDeletedSource.next();
  }
}
