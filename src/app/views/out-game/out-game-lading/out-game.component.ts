import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateGamingRoom } from 'src/app/interfaces';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { LobbyService } from '../lobby/lobby.service';

@Component({
  selector: 'app-out-game',
  templateUrl: './out-game.component.html',
  styleUrls: ['./out-game.component.scss']
})
export class OutGameComponent implements OnInit, OnDestroy {
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _chatService: ChatService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _lobbyService: LobbyService,   
  ) {

  }


  ngOnInit(): void {
    this._chatService.roomId = 'lobby';
    this._chatService.chatRoomName = 'SendMssage';
    this._subscriptions.push(
      this._chatService.watchConnectionState().subscribe((res:signalR.HubConnectionState) => {
        if(res.toString() === "Connected"){
          this._chatService.connection.on('GamingRooms', (roomsOrMsg: Array<CreateGamingRoom> | string, roomCreated: CreateGamingRoom | null, CreatedBy:string,isSuccess: boolean) => {
            console.log('GamingRooms');
            
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
                this._lobbyService.CurrentRooms = (roomsOrMsg as Array<CreateGamingRoom>);
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
