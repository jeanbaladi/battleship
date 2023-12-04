import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../views/auth/auth.service';

@Injectable()
export class RenewTokenInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.currentToken;
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
        this.authService.loginByRefresh(token);
      }else{
        this.authService.logout();
      }
    }
    return next.handle(req).pipe(
      map((response : any) => {
        let newToken : string = response?.headers?.get('authorization');
        if(newToken){
          console.log('newToken',newToken);
          
          localStorage.setItem('Token', newToken);
          this.authService.setCurrentToken(newToken);
        }
        return response;
      }),
      catchError((err : HttpErrorResponse) => {
        this.authService.logout();
        //alert(`error: ${err.status}. \n msg: ${err.error}`);
        if(err.error == "Token ya utilizado"){
          //this.api.logout();
          console.log(err);
          
        }
        return throwError(() => err);
      })
    );
  }

  
}
