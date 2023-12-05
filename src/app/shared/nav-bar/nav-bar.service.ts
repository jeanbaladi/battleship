import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private _routes: Array<string> = [
    "logout",
    "profile",
    "lobby"
  ]
  constructor() { }

  public get routes() {
    return this._routes;
  }
}
