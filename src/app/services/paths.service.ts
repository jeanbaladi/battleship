import { Injectable } from '@angular/core';
import { navbarElements } from '../interfaces';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class PathsService {
  private _logout: string = 'logout';
  private _profile: string = 'profile';
  private _lobby: string = 'lobby';
  private _activeRoute: string = '';
  public eventsEvents$ : Subscription = new Subscription();
  
  private _routes: Array<navbarElements> = [
    {path:"logout", active: false},
    {path:"profile", active: false},
    {path:"lobby", active: false}
  ]

  constructor(public router: Router) {
    this.eventsEvents$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this._routes.forEach(r => r.active = false);
        console.log(event);
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
