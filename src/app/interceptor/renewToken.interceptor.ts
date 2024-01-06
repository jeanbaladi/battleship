import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../views/auth/auth.service';

@Injectable()
export class RenewTokenInterceptor implements HttpInterceptor {

  constructor(private _authService : AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this._authService.currentToken;
    if(token) {
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
    }else{
      if(localStorage.getItem('Token')){
        //login mediante refresh
        token = localStorage.getItem('Token') as string;
        req = req.clone({
          headers: req.headers.set("loginByRefresh", `true`)
        });
        this._authService.loginByRefresh(token);
      }else{
        //this._authService.logout();
      }
    }
    return next.handle(req).pipe(
      map((response : any) => {
        let newToken : string = response?.headers?.get('authorization');
        console.log('newToken',newToken);
        
        if(newToken){
          localStorage.setItem('Token', newToken);
          this._authService.setCurrentToken(newToken);
        }
        return response;
      }),
      catchError((err : HttpErrorResponse) => {
        //this.authService.logout();
        return throwError(() => err);
      })
    );
  }

  
}
