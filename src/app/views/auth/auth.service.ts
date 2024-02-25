import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { user, Auth, ResponseHTTP, ProfileDTO, Profile, IdentityUser, PswRequirements, checkPsw } from 'src/app/interfaces'
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

const INITIAL_INFO_VALUE: Profile = {
  identityId: '',
  userName: '',
  address: '',
  statistics: {
    battlesWin: 0,
    battlesLose: 0,
    totalBattlesPlayed: 0,
    elo: 0,
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  private isLogginByRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _currentUserDTO! : ProfileDTO;
  public pswRequirements: PswRequirements = {
    hasUpperCase: "The password does not have at least one uppercase letter",
    hasLowerCase: "The password does not have at least one lowercase letter",
    hasNumeric: "The password does not have at least one number",
    hasSpecialCaracter: "The password does not have at least one special caracter",
  };
  constructor(http: HttpClient, private route: Router){
    super(http);
  }

  public pswValidator(value: string): string[] | string {
    const hasUpperCase: boolean = /[A-Z]+/.test(value);
    const hasLowerCase: boolean = /[a-z]+/.test(value);
    const hasNumeric: boolean = /[0-9]+/.test(value);
    const hasSpecialCaracter: boolean = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const passwordValid = [
      {"hasUpperCase":hasUpperCase, errMsg: this.pswRequirements['hasUpperCase']},
      {"hasLowerCase":hasLowerCase, errMsg: this.pswRequirements['hasLowerCase']},
      {"hasNumeric":hasNumeric, errMsg: this.pswRequirements['hasNumeric']},
      {"hasSpecialCaracter":hasSpecialCaracter, errMsg: this.pswRequirements['hasSpecialCaracter']},
    ];
    const errMsgs: string[] = [];
    passwordValid.forEach((req, i) => {
      const values: string = Object.values(passwordValid[i])[0];
      if(!values){
        errMsgs.push(req.errMsg);
        
      }
    })
    if(errMsgs.length > 0){
      return errMsgs;
    }

    return "valid";
  }

  public login(user: user): Observable<ResponseHTTP<Auth>> {    
    return this.post<ResponseHTTP<Auth>>(`users/login`, user).pipe(
      tap((res: ResponseHTTP<Auth>) => {
        if(res.isSuccess){
          const {result} = res;
          this.authInfo = result;
          let userDTO: ProfileDTO = {identityId: result.user.id, userName: result.user.userName}
          this.currentUserDTO = userDTO;
          localStorage.setItem('Token', result.authenticationResponse.token as string);
          localStorage.setItem('SessionId', result.sessionId);
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
            this.authInfo = result;
            this.currentUserDTO = {identityId: result.user.id, userName: result.user.userName};
            localStorage.setItem('Token', result.authenticationResponse.token as string);
            this.setCurrentToken(result.authenticationResponse.token);
          }
        })
      )
  }

  public register(user: user): Observable<ResponseHTTP<Auth>> {
    return this.post<ResponseHTTP<Auth>>('users/register', user);
  }

  public logout(): Observable<ResponseHTTP<string>>{
    localStorage.setItem('Token', '');
    this.returnAuthInfoToInitialState();
    // this.authInfo.sessionId = "";
    this.setCurrentToken(null);
    this.route.navigate(['auth']);
    return this.post<ResponseHTTP<string>>(`users/logout/${this.currentUserDTO.identityId}`, null);
  }

}
