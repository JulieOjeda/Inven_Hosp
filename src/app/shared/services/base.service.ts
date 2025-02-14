import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  private source = new BehaviorSubject<T | null>(null);
  item$ = this.source.asObservable();
  private listSource = new BehaviorSubject<T[]>([]);
  list$ = this.listSource.asObservable();

  constructor() { }

  updateItem(item: T): void {
    this.source.next(item);
  }

  updateList(items: T[]): void {
    this.listSource.next(items);
  }

  addItemToList(item: T): void {
    const currentList = this.listSource.getValue();
    this.listSource.next([...currentList, item]);
  }
}
