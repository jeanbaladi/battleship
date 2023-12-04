import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Profile } from 'src/app/interfaces';

const INITIAL_INFO_VALUE: Profile = {
  id: 0,
  identityId: '',
  userName: '',
  address: '',
  battlesWin: 0,
  battlesLose: 0,
  totalBattlesPlayed: 0,
  elo: 0,
}

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  public userInfo: Profile = INITIAL_INFO_VALUE;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.userInfo = this.authService.currentUser.profile;
  }

}
