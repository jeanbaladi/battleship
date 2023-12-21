import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map, of, take, tap } from 'rxjs';
import { Auth, ProfileDTO } from 'src/app/interfaces';
import { AuthService } from 'src/app/views/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser : Auth = authService.currentUser;
  const currentUserDTO : ProfileDTO = {identityId: currentUser.profile.identityId, userName: currentUser.profile.userName};
  if(currentUser.profile.identityId) return true;
  
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