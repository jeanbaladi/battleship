import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RenewTokenInterceptor implements HttpInterceptor {

  constructor(private api : ApiService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('Token');
    if(token) {
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
    }else{
      //this._requestService.logout();
    }
    return next.handle(req).pipe(
      map((response : any) => {
        let newToken : string = response?.headers?.get('authorization');
        if(newToken){
          localStorage.setItem('Token', newToken);
          this.api.currentToken = newToken;
        }
        return response;
      }),
      catchError((err : HttpErrorResponse) => {
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
