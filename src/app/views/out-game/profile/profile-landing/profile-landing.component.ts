import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { PlayerStatistics, Profile, ResponseHTTP } from 'src/app/interfaces';
import { NavBarService } from 'src/app/shared/nav-bar/nav-bar.service';
import { ProfileService } from 'src/app/views/profile.service';

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
export class ProfileLandingComponent implements OnInit, OnDestroy {
  public userInfo: Profile = INITIAL_INFO_VALUE;
  profileId: string = '';
  private _subscriptions$: Array<Subscription> = [];

  constructor(
    private _profileService: ProfileService,
    private _navBarService: NavBarService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
      this.profileId = this._activatedRoute.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    console.log('asdadwqewedasd');
    this.getProfile();
    this._subscriptions$.push(
      this._navBarService.showProfileId().subscribe((id) => {
        
        this.profileId = id;
        this.getProfile();
      })
    )
  }

  getProfile() {
    console.log('changes', this.profileId);
    this._profileService.getProfile(this.profileId)
      .pipe(take(1))
      .subscribe((response: ResponseHTTP<Profile[]>) => {
        console.log('asdadwqewedasd', response.result[0].identityId);
        // var asd: any[] = response.result;
        this.userInfo = response.result[0]
        //console.log('changes',this.userInfo);
      });
  }

  ngOnDestroy(): void {
    console.log('debugger', 'destroy');
    
    this._subscriptions$.forEach((sub) => sub.unsubscribe());
  }

}
