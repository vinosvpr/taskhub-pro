import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (auth.isLoggedIn()) {
    return true;
  }
  if (token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
