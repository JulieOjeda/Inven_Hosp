import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token'; // Clave para almacenar el token en localStorage

  constructor(private router: Router) {
  }
  // Guarda el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Elimina el token (para logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  redirectToLogin(){
    this.router.navigate(["/login"])
  }
}
