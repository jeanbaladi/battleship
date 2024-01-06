import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, take, throwError } from "rxjs";
import { AuthService } from "../views/auth/auth.service";
import { NotificationService } from "../services/notifications/notification.service";
import { ResponseHTTP } from "../interfaces";

@Injectable()
export class ControlSimultaneousSessionsInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService, private _notificationService: NotificationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let sessionId = this._authService.authInfo.sessionId;
        if(!sessionId){
            sessionId = localStorage.getItem("SessionId") || "";
        }

        req = req.clone({
            headers: req.headers.set("SessionId", sessionId)
        });

        return next.handle(req).pipe(
            catchError((err : HttpErrorResponse) => {
                //this._authService.logout();
                console.log('throwError', err);
                if(err.status == 401){
                    this._authService.logout().pipe(
                        take(1)
                    ).subscribe((response: ResponseHTTP<string>) => 
                        this._notificationService.showNotification(response.result)
                    );
                    this._notificationService.showNotification(err.error)
                } 
                return throwError(() => err);
              })
        )
    }

}

//authInfo