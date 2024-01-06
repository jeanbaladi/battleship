import { Injectable, inject } from '@angular/core';
import { ResponseHTTP, navbarElements } from '../interfaces';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription, take } from 'rxjs';
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
  public eventsEvents$ : Subscription = new Subscription();
  
  private _routes: Array<navbarElements> = [
    {path:"logout", active: false, method: () => {
      this._authService.logout().pipe(take(1)).subscribe((response: ResponseHTTP<string>) => this.notificationService.showNotification(response.result));}
    },
    {path:"profile", active: false, method: () => {this.router.navigate([`battleship/profile/${this._authService.authInfo.user.id}`])}},
    {path:"lobby", active: false, method: (params) => {this.router.navigate([`battleship/lobby`])}}
  ]

  constructor(public router: Router, private _authService: AuthService) {
    this.eventsEvents$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
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
