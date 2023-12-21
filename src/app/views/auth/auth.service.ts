import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { user, Auth, ResponseHTTP, ProfileDTO } from 'src/app/interfaces'
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  private isLogginByRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _currentUserDTO! : ProfileDTO;
  constructor(http: HttpClient, private route: Router){
    super(http);
  }

  public login(user: user): Observable<ResponseHTTP<Auth>> {    
    return this.post<ResponseHTTP<Auth>>(`users/login`, user).pipe(
      tap((res: ResponseHTTP<Auth>) => {
        if(res.isSuccess){
          const {result} = res;
          this.currentUser = result;
          let userDTO: ProfileDTO = {identityId: result.profile.identityId, userName: result.profile.userName}
          this.currentUserDTO = userDTO;
          localStorage.setItem('Token', result.authenticationResponse.token as string);
          this.setCurrentToken(result.authenticationResponse.token);
        }
      })
    );
  }

  public set currentUserDTO(currentUserDTO: ProfileDTO) {
    this._currentUserDTO = currentUserDTO;
  }
  public get currentUserDTO(): ProfileDTO {
    return this._currentUserDTO;
  }
  public set isLogginByRefresh(status: boolean) {
    this.isLogginByRefresh$.next(status);
  }
  public get isLogginByRefresh(): Observable<boolean> {
    return this.isLogginByRefresh$.asObservable();
  }

  public loginByRefresh(token: string): Observable<ResponseHTTP<Auth>> {
    const params = new HttpParams()
      .set('token', token)
    return this.post<ResponseHTTP<Auth>>(`users/loginByRefresh`, null, params)
      .pipe(
        tap((res: ResponseHTTP<Auth>) => {
          if(res.isSuccess){
            const {result} = res;
            this.currentUser = result;
            this.currentUserDTO = {identityId: result.profile.identityId, userName: result.profile.userName};
            localStorage.setItem('Token', result.authenticationResponse.token as string);
            this.setCurrentToken(result.authenticationResponse.token);
          }
        })
      )
  }

  public logout(){
    localStorage.setItem('Token', '');
    this.setCurrentToken(null);
    this.route.navigate(['auth']);
  }

}
