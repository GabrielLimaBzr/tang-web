import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  let autheticated = authService.isAuteticado();
  if (autheticated) {
    return true;
  } else {
    router.navigate(["home"]);
    return false;
  }
};
