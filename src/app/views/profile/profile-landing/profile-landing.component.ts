import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { PlayerStatistics, Profile, ResponseHTTP } from 'src/app/interfaces';

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

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.scss']
})
export class ProfileLandingComponent implements OnInit {
  public userInfo: Profile = INITIAL_INFO_VALUE;
  constructor(private _profileService: ProfileService) {

  }
  ngOnInit(): void {
    this._profileService.getStatistics()
      .subscribe((response: ResponseHTTP<PlayerStatistics>) => {
        this.userInfo = this._profileService.profileInfo;
      });
  }

}
