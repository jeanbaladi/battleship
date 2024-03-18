import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IdentityUser, PlayerStatistics, Profile, ResponseHTTP } from '../interfaces';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
export class ProfileService extends ApiService{
  private _profileInfo: Profile = INITIAL_INFO_VALUE;
  constructor(http: HttpClient, private _AuthService: AuthService) { 
    super(http);
  }

  public getStatistics(){
    const id = this._AuthService.authInfo.user.id;
    return this.get<ResponseHTTP<PlayerStatistics>>(`statistics/${id}`).pipe(
      tap((res: ResponseHTTP<PlayerStatistics>) => {
        if(res.isSuccess){
          this.buildProfile(this.authInfo.user, res.result);
        }
      })
    )
  }

  public getProfile(identityId: string): Observable<ResponseHTTP<Profile[]>> {
    return this.get<ResponseHTTP<Profile[]>>(`statistics/${identityId}/playerProfile`)
  }

  public buildProfile(user: IdentityUser, playerStatistics: PlayerStatistics){
    this._profileInfo.identityId = user.id;
    this._profileInfo.userName = user.userName;
    this._profileInfo.address = user.email;
    this._profileInfo.statistics = {
      battlesWin : playerStatistics.battlesWin,
      battlesLose : playerStatistics.battlesLose,
      totalBattlesPlayed : playerStatistics.totalBattlesPlayed,
      elo : playerStatistics.elo,
    }
  }

  public get profileInfo(){
    return this._profileInfo;
  }

}
