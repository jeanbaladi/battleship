import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/interfaces';
import { AuthService } from 'src/app/views/auth/auth.service';

export const profileGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser : Auth = authService.authInfo;
  if(currentUser.roles.includes("guest")) return router.createUrlTree(['/battleship/outGame/lobby']);
  return true;
};