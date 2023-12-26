import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from '../Chat.service';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { PathsService } from 'src/app/services/paths.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { userDTO } from 'src/app/interfaces';
import { mapper } from 'src/app/utils/mapper';
import { InGameService } from 'src/app/views/in-game/inGame.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public trigger: boolean = false;
  // public gameId: string = '';
  constructor(
    public chatService: ChatService, 
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _inGameService: InGameService,
    private _notificationService: NotificationService
    ){}

  ngOnInit(): void {
    this.chatService.roomId = this._route.snapshot.paramMap.get('gameId') || '';
    if(this.chatService.roomId){
      this.chatService.startConnection('gameHub');
      this.chatService.AddToGroup(this.chatService.connection, this.chatService.roomId, this.chatService.currentUserDTO);
      this.chatService.connection.on('UserAdded', (notification: string, user: userDTO) => {
        
        if(user.identityId !== this.chatService.currentUserDTO.identityId){
          this._notificationService.showNotification(`${user.userName} has joined`);
        }

        if(user.identityId !== this._authService.currentUserDTO.identityId){
          this._inGameService.opponent = user;
        }
      });

      this.chatService.connection.on('NotifyPlayerLeft', (user: userDTO) => {
        if(this.chatService.currentUserDTO.identityId !== user.identityId){
          this._notificationService.showNotification(`${user.userName} left the room`);
        }
      });
      this.chatService.addMetHods('UserAdded','NotifyPlayerLeft');
    }
  }

  triggerChat(){
    this.trigger = !this.trigger;
    
  }

}
