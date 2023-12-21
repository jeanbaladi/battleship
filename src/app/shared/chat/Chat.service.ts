import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MsgDTO, userDTO } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { MiddlewareService } from 'src/app/services/middleware.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends MiddlewareService{
  webSockecketUrl = environment.WebSocket;
  private _connection!: signalR.HubConnection;
  private _currentUserDTO!: userDTO;

  constructor(private _authService: AuthService) {
    super()
  }

  public startConnection(path : string): void{
    this._currentUserDTO = {
      address: this._authService.currentUser.profile.address,
      identityId: this._authService.currentUser.profile.identityId,
      userName: this._authService.currentUser.profile.userName,
    };
    this._connection = this.connectionBuilder(path);
  }

  emitValue(roonName: string, msg: MsgDTO){
    console.log(this._currentUserDTO);
    
    this.connection.invoke('SendMssage', roonName, msg, this._currentUserDTO).catch(() => {
      console.warn('error in webcokect');
    });
  }

  public get connection(): signalR.HubConnection{
    return this._connection;
  }

  public get currentUserDTO(): userDTO {
    return this._currentUserDTO;
  }

}
