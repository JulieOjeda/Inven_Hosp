
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Areas } from '../interfaces/models/areas.model';

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

  createArea(gear: Areas): Observable<Areas>{
    return this.http.post<Areas>(`${this.apiUrl}`, gear)
  }

  sendImage(data : FormData): Observable<any>{
   return this.http.post<any>(`http://localhost:3000/images`, data)
  }
}
