import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { user, uthenticationResponse } from 'src/app/interfaces'
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  constructor(http: HttpClient){
    super(http);
  }

  public login(user: user): Observable<uthenticationResponse> {
    return this.post<uthenticationResponse>(`${this.apiURL}users/login`, user)
      .pipe(
        tap(res => {
          
          if(res){
            localStorage.setItem('Token', res.token);
            this.currentToken = res.token;
          }
        })
      );
  }

}
