import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (authService.getToken()) {
    return true
  } else {
    authService.redirectToLogin()
    return false;
  }
};
