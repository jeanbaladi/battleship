import { Component } from '@angular/core';
import { Profile } from 'src/app/interfaces';
import { AuthService } from '../../auth/auth.service';

const INITIAL_PLAYED_VALUE: Profile = {
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
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.scss']
})
export class GamesPlayedComponent {
  public userInfo: Profile = INITIAL_PLAYED_VALUE;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.userInfo = this.authService.currentUser.profile;
  }
}
