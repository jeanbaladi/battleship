import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  private _currentToken : string = '';
  private _apiURL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public get apiURL(): string {
    return this._apiURL;
  }

  public get currentToken(): string{
    return this._currentToken;
  }

  public set currentToken(token: string) {
    this._currentToken = token;
  }

  public get<T>(endPoint : string): Observable<T>{
    return this.http.get<T>(endPoint);
  }
  public post<T>(endPoint : string, body: any): Observable<T>{
    return this.http.post<T>(endPoint, body);
  }
  public Delete<T>(endPoint : string): Observable<T>{
    return this.http.delete<T>(endPoint);
  }

}
