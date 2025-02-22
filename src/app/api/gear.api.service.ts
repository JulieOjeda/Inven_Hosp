// src/app/infrastructure/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gear } from '../interfaces/models/gear.model';
import {Notification} from '../shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class GearApiService {
  private apiUrl = 'http://localhost:3000/gear'; // URL de la API

  constructor(private http: HttpClient) {}

  getGears(): Observable<Gear[]> {
    return this.http.get<Gear[]>(this.apiUrl);
  }

  getGearById(id: string): Observable<Gear> {
    return this.http.get<Gear>(`${this.apiUrl}/${id}`);
  }

  createGear(gear: Gear): Observable<Gear>{
    return this.http.post<Gear>(`${this.apiUrl}`, gear)
  }

  sendImage(data : FormData): Observable<any>{
   return this.http.post<any>(`http://localhost:3000/images`, data)
  }

  getGearMaintenanceNotifications():  Observable<Notification[]>{
    return this.http.get<Notification[]>(this.apiUrl+"/notifications");
  }
}
