import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';


export const authGuard: CanActivateFn = () => {
  const authService = inject(LoginService);
  const router = inject(Router);

  // const token = authService.getToken();
  const valid = authService.isAuthenticated();

  // console.log('[GUARD] Token:', token);
  console.log('[GUARD] Autenticado:', valid);

  if (!valid) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};