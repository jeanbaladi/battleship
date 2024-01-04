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
    private _chatService: ChatService, 
    private _notificationService: NotificationService,
    private _router: Router
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

    this._chatService.roomId = 'lobby';
    this._chatService.chatRoomName = 'SendMssage';
    this._subscriptions.push(
      this._chatService.watchConnectionState().subscribe((res:signalR.HubConnectionState) => {
        if(res.toString() === "Connected"){
          this._chatService.connection.on('GamingRooms', (roomsOrMsg: Array<CreateGamingRoom> | string, roomCreated: CreateGamingRoom | null, CreatedBy:string,isSuccess: boolean) => {
              if(isSuccess){
                if(roomCreated != null){
                  if(roomCreated.createdBy == this._chatService.currentUserDTO.userName){
                    this._router.navigate([`battleship/inGame/`,roomCreated.id], { queryParams: { 
                      roomName: roomCreated.roomName,
                      createdBy: roomCreated.createdBy,
                      maxPlayerForGroup: roomCreated.maxPlayerForGroup,
                      playerCount: roomCreated.playerCount,
                      roomCompleted: roomCreated.roomCompleted,
                    }})
                    return;
                  }
                }
                this.rooms = (roomsOrMsg as Array<CreateGamingRoom>);
              }else if(CreatedBy == this._chatService.currentUserDTO.userName){
                this._notificationService.showNotification(roomsOrMsg as string);
              }
          })
          
          this._chatService.addMetHods('GamingRooms');

        }
      })
    )
  }

  ngOnDestroy(): void {
    if(this._subscriptions){
      this._subscriptions.forEach(sub => sub.unsubscribe());
    }
    this._chatService.disconnectAllConection();
    this._chatService.removeAllMetHods();
  }

}
