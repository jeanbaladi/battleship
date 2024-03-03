import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from '../interfaces';

const INITIAL_VALUE : Auth = {
  authenticationResponse: {
    expiration: new Date(),
    token: null,
  },
  user: {
    email: '',
    emailConfirmed: false,
    id: '',
    userName: '',
  },
  sessionId: "unlogged",
  roles: []
}

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  private _authInfo : Auth = INITIAL_VALUE;
  private _apiURL = environment.apiUrl;

  constructor(public http: HttpClient) { }

  public get apiURL(): string {
    return this._apiURL;
  }

  public get authInfo(): Auth{
    return this._authInfo;
  }

  public set authInfo(user: Auth) {
    this._authInfo = user;
  }

  public returnAuthInfoToInitialState(){
    this._authInfo = INITIAL_VALUE;
  }

  public setCurrentToken(token: string | null) {
    this._authInfo.authenticationResponse.token = token;
  }

  public get currentToken(): string {
    return this._authInfo.authenticationResponse.token as string;
  }

  public get<T>(endPoint : string, params: HttpParams = new HttpParams()): Observable<T>{
    return this.http.get<T>(`${this.apiURL}/${endPoint}`, {params});
  }
  public post<T>(endPoint : string, body: any, params: HttpParams = new HttpParams()): Observable<T>{
    return this.http.post<T>(`${this.apiURL}/${endPoint}`, body, {params});
  }
  public Delete<T>(endPoint : string, id: string): Observable<T>{
    return this.http.delete<T>(`${this.apiURL}/${endPoint}/${id}`);
  }

}
