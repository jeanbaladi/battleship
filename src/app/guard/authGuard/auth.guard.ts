import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map, of, take, tap } from 'rxjs';
import { Auth, ProfileDTO } from 'src/app/interfaces';
import { AuthService } from 'src/app/views/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser : Auth = authService.authInfo;
  const currentUserDTO : ProfileDTO = {identityId: currentUser.user.id, userName: currentUser.user.userName};

  if(currentUser.roles.includes("guest")) return true;
  if(currentUser.user.id) return true;
  
  const token = localStorage.getItem('Token');
  if(token) {
    //authService.isLogginByRefresh = true;
    // return authService.loginByRefresh(token)
    return authService.loginByRefresh(localStorage.getItem('Token') || '')
      .pipe(
        take(1),
        map(res => !!res ? true : router.createUrlTree(['auth']))
      )
  }
  return router.createUrlTree(['auth']);
};