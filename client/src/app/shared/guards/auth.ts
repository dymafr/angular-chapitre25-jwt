import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDataClient } from '../services/auth.data-client';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthDataClient);
  const router = inject(Router);
  const isLoggedin = !!(await authService.fetchCurrentUser());
  if (!isLoggedin) {
    router.navigateByUrl('/signin');
  }
  return isLoggedin;
};
