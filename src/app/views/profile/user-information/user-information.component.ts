import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces';
import { ProfileService } from '../../profile.service';

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
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  @Input('userInfo') public userInfo: Profile = INITIAL_INFO_VALUE;
  constructor(){}
  ngOnInit(): void {}

}
