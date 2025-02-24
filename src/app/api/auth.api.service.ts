
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Report } from '../interfaces/models/report.model';
import {environment} from '../../environments/environment';
import {AuthService} from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = `${environment.apiUrl}/user`; // URL de la API

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  login(userCredential: {username: string, password: string}): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, userCredential ).pipe(
      map((response) => {
        this.authService.setToken(response.token);

        return true;
      })
    );
  }
}
