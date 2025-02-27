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

  isTokenExpired(): boolean {
    const token = this.getToken(); // Obtén el token del almacenamiento
    if (!token) {
      return true; // Si no hay token, se considera expirado
    }

    // Decodifica el token (asumiendo que es un JWT)
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del payload
    const expirationDate = new Date(tokenData.exp * 1000); // Convierte la fecha de expiración
    const now = new Date();

    // Compara la fecha de expiración con la fecha actual
    return expirationDate <= now;
  }
}
