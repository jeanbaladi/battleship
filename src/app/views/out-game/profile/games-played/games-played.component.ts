import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/interfaces';

const INITIAL_PLAYED_VALUE: Profile = {
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
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.scss']
})
export class GamesPlayedComponent {
  @Input('userInfo') public userInfo: Profile = INITIAL_PLAYED_VALUE;
  constructor(){}
  ngOnInit(): void {}
}
