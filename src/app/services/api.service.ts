import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from '../interfaces';

const INITIAL_VALUE : Auth = {
  authenticationResponse: {
    expiration: new Date(),
    token: null
  },
  profile: {
    id: 0,
    identityId: '',
    userName: '',
    address: '',
    battlesWin: 0,
    battlesLose: 0,
    totalBattlesPlayed: 0,
    elo: 0,
  }
}

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  private _currentUser : Auth = INITIAL_VALUE;
  private _apiURL = environment.apiUrl;

  constructor(public http: HttpClient) { }

  public get apiURL(): string {
    return this._apiURL;
  }

  public get currentUser(): Auth{
    return this._currentUser;
  }

  public set currentUser(user: Auth) {
    this._currentUser = user;
  }

  public setCurrentToken(token: string | null) {
    this._currentUser.authenticationResponse.token = token;
  }

  public get currentToken(): string {
    return this._currentUser.authenticationResponse.token as string;
  }

  public get<T>(endPoint : string): Observable<T>{
    return this.http.get<T>(`${this.apiURL}/${endPoint}`);
  }
  public post<T>(endPoint : string, body: any, params: HttpParams = new HttpParams()): Observable<T>{
    console.log('this.apiURL', this.apiURL);
    
    return this.http.post<T>(`${this.apiURL}/${endPoint}`, body, {params});
  }
  public Delete<T>(endPoint : string, id: string): Observable<T>{
    return this.http.delete<T>(`${this.apiURL}/${endPoint}/${id}`);
  }

}
