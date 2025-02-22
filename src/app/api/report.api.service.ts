
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../interfaces/models/report.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportApiService {
  private apiUrl = `${environment.apiUrl}/report`; // URL de la API

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  getReportById(id: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  createReport(report: Report): Observable<Report>{
    return this.http.post<Report>(`${this.apiUrl}`, report)
  }

  updateReport(report: Report): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, report)
  }
}
