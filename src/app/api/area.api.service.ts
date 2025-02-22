
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Areas } from '../interfaces/models/areas.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaApiService {
  private apiUrl = 'http://localhost:3000/area'; // URL de la API

  constructor(private http: HttpClient) {}

  getArea(): Observable<Areas[]> {
    return this.http.get<Areas[]>(this.apiUrl);
  }

  getAreaById(id: string): Observable<Areas> {
    return this.http.get<Areas>(`${this.apiUrl}/${id}`);
  }

  createArea(area: Areas): Observable<Areas>{
    return this.http.post<Areas>(`${this.apiUrl}`, area)
  }

  sendImage(data : FormData): Observable<any>{
   return this.http.post<any>(`http://localhost:3000/images`, data)
  }

  updateArea(area: Areas): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/area`, area)
  }
}
