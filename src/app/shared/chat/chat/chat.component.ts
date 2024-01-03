import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatService } from '../Chat.service';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PathsService } from 'src/app/services/paths.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { userDTO } from 'src/app/interfaces';
import { mapper } from 'src/app/utils/mapper';
import { InGameService } from 'src/app/views/in-game/inGame.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input('hubMethod') hubMethod: string = '';
  @Input('pathConnection') pathConnection: string = '';
  public trigger: boolean = false;
  private _watchConnectionState$!: Subscription;

  constructor(
    public chatService: ChatService, 
    private _router: Router,
    private _authService: AuthService,
    private _inGameService: InGameService,
    private _notificationService: NotificationService
  ){}

  ngOnInit(): void {
    if(this.chatService.roomId){
      this.chatService.startConnection(this.pathConnection);
      this.chatService.AddToGroup(this.chatService.connection, this.chatService.roomId, this.chatService.currentUserDTO);
      this._watchConnectionState$ = this.chatService.watchConnectionState().subscribe((res:signalR.HubConnectionState) => {
        if(res.toString() === "Connected"){
          
          this.chatService.connection.on('UserAdded', (notification: string, user: userDTO, isSucces: boolean) => {
            //Parte de esta logica se debe de implementar desde los componentes 'inGame'
            console.log('notification',isSucces,notification);
            if(isSucces){
              if(user.identityId !== this.chatService.currentUserDTO.identityId){
                this._notificationService.showNotification(`${user.userName} has joined`);
              }
      
              if(user.identityId !== this._authService.currentUserDTO.identityId){
                this._inGameService.opponent = user;
              }
            }else{
              //this._router.navigate(['battleship/lobby'])
            }
          });
    
          this.chatService.connection.on('NotifyPlayerLeft', (user: userDTO) => {
            if(this.chatService.currentUserDTO.identityId !== user.identityId){
              this._notificationService.showNotification(`${user.userName} left the room`);
            }
          });
          this.chatService.addMetHods('UserAdded','NotifyPlayerLeft');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if(this._watchConnectionState$){
      this._watchConnectionState$.unsubscribe();
    }
    this.chatService.disconnectAllConection();
    this.chatService.removeAllMetHods();
  }

  triggerChat(){
    this.trigger = !this.trigger;
    
  }

}
