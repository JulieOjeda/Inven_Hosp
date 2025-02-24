import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';

export function authInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // Obtén el token del servicio de autenticación
    console.log('AuthInterceptor: interceptando solicitud');
    const authService = inject(AuthService)
    const token = authService.getToken();
    // Si hay un token, clona la solicitud y agrega el token a las cabeceras
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continúa con la solicitud modificada
    return next(req);
}

