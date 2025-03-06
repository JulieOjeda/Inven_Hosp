import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private refreshSubject = new BehaviorSubject<void>(undefined);

  get refresh$() {
    return this.refreshSubject.asObservable();
  }

  triggerRefresh() {
    this.refreshSubject.next();
  }
}
