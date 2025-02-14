import { Injectable } from '@angular/core';
import { ClientModel } from '../interfaces/models/client.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client: ClientModel
  constructor(){
    this.client = {
      _id : 1,
      adress: "por ahis",
      logoId: "2113a5sd4sa56",
      name : "Hospital Viedma"
    }
  }
  setCurrentClient(client: ClientModel): void {
    this.client = client;
  }

  getCurrentClient(): ClientModel {
    return this.client
  }
}
