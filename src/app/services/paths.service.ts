import { Injectable, inject } from '@angular/core';
import { ResponseHTTP, navbarElements } from '../interfaces';
import { NavigationEnd, Router, Event, NavigationCancel, NavigationError } from '@angular/router';
import { Observable, Subject, Subscription, take } from 'rxjs';
import { InGameService } from '../views/in-game/inGame.service';
import { ChatService } from '../shared/chat/Chat.service';
import { AuthService } from '../views/auth/auth.service';
import { NotificationService } from './notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export abstract class PathsService {
  private _logout: string = 'logout';
  private _profile: string = 'profile';
  private _lobby: string = 'lobby';
  private _activeRoute: string = '';
  private notificationService = inject(NotificationService)
  public changeProfileId: Subject<string> = new Subject<string>();
  public eventsEvents$ : Subscription = new Subscription();
  
  private _routes: Array<navbarElements> = [
    {path:"logout", active: false, isAccessible: true, 
      method: () => { 
        this._authService.logout().pipe(take(1)).subscribe((response: ResponseHTTP<string>) => this.notificationService.showNotification(response.result));
        localStorage.setItem('Token', '');
        this._authService.returnAuthInfoToInitialState();
        // this.authInfo.sessionId = "";
        this._authService.setCurrentToken(null);
        this.router.navigate(['auth']);
      }
    },
    {path:"profile", active: false, isAccessible: true, 
      method: (userId: string = this._authService.authInfo.user.id) => {
        this.router.navigate([`battleship/outGame/profile/${userId}`])
        this.changeProfileId.next(userId);
        console.log('debugger',userId);
        console.log('debugger',this.router.url);
      }
    },
    {path:"lobby", active: false, isAccessible: true, 
      method: (params) => {
        this.router.navigate([`battleship/outGame/lobby`])
      }
    }
  ]

  constructor(public router: Router, private _authService: AuthService) {
    this.eventsEvents$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log('routing', event);
        this._routes.forEach(r => r.active = false);
        this._routes.find(r => event.url.includes(r.path))
        const getActiveRoute = this._routes.find(r => this.router.url.includes(r.path));
        if(getActiveRoute){
          getActiveRoute.active = true;
          this._activeRoute = getActiveRoute.path;
        }
      }
    });
  }
  
  public showProfileId(): Observable<string> {
    return this.changeProfileId.asObservable();
  }

  get Logout(): string{
    return this._logout;
  }
  get Profile(): string{
    return this._profile;
  }
  get Lobby(): string{
    return this._lobby;
  }
  get ActiveRoute(): string{
    return this._activeRoute;
  }
  get Routes(): Array<navbarElements>{
    return this._routes;
  }

}
