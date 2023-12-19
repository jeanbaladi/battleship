import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { CreateGamingRoom, ResponseHTTP } from 'src/app/interfaces';

@Component({
  selector: 'app-current-games',
  templateUrl: './current-games.component.html',
  styleUrls: ['./current-games.component.scss']
})
export class CurrentGamesComponent implements OnInit {
  public rooms: Array<CreateGamingRoom> = [];
  constructor(private _lobbyService: LobbyService){}

  ngOnInit(): void {
    this._lobbyService.getAllRooms()
      .subscribe((response: ResponseHTTP<Array<CreateGamingRoom>>) => {
        if(response.isSuccess){
          this.rooms = response.result
          console.log(this.rooms);
        }else console.warn(response.result);
        
      });
  }

}
