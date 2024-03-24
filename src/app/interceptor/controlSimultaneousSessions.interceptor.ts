import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notifications/notification.service";
import { AuthService } from "../views/auth/auth.service";

@Injectable()
export class ControlSimultaneousSessionsInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService, 
        private _notificationService: NotificationService,
        private _router: Router,
    ){}

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
                if(err.status == 401){
                    this._notificationService.showNotification('this account was started on another computer');
                    this._authService.returnAuthInfoToInitialState();
                    this._router.navigate(['/auth'])
                } 
                return throwError(() => err);
              })
        )
    }

}

//authInfo