import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { CreateGamingRoom, ResponseHTTP } from 'src/app/interfaces';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { Subscription, take } from 'rxjs';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-games',
  templateUrl: './current-games.component.html',
  styleUrls: ['./current-games.component.scss']
})
export class CurrentGamesComponent implements OnInit, OnDestroy {
  public rooms: Array<CreateGamingRoom> = [];
  public connection!: signalR.HubConnection;
  private _subscriptions: Array<Subscription> = [];
  constructor(
    private _lobbyService: LobbyService, 
  ){}

  ngOnInit(): void {
    if(this.rooms.length == 0){
      this._subscriptions.push(
        this._lobbyService.getAllRooms()
        .subscribe((response: ResponseHTTP<Array<CreateGamingRoom>>) => {
          if(response.isSuccess){
            this.rooms = response.result;
            console.log('rooms', this.rooms);
          }else console.warn(response.result);
        })
      )
    }
    this._subscriptions.push(
      this._lobbyService.WatchCurrentRooms().subscribe((rooms: Array<CreateGamingRoom>) => {
        this.rooms = rooms;
          console.log('rooms', this.rooms);
      })
    )
    
  }

  ngOnDestroy(): void {
    if(this._subscriptions){
      this._subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

}
