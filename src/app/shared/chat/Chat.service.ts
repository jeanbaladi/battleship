import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MsgDTO, userDTO } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends ApiService{
  webSockecketUrl = environment.WebSocket;
  connection: any;
  private _currentUserDTO!: userDTO;

  constructor(http: HttpClient, private _authService: AuthService) {
    super(http)
  }

  public get currentUserDTO(): userDTO {
    return this._currentUserDTO;
  }

  public startConnection(path : string): void{
    this._currentUserDTO = {
      address: this._authService.currentUser.profile.address,
      identityId: this._authService.currentUser.profile.identityId,
      userName: this._authService.currentUser.profile.userName,
    };
    console.log(`${this.webSockecketUrl}/${path}`);
    
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.webSockecketUrl}/${path}`,{
              skipNegotiation: true, 
              transport: signalR.HttpTransportType.WebSockets
          }).build();
  }

  joinGroup(roonName: string){
    this.connection.start()
      .then(() => {
        this.connection.invoke('AddToGroup',roonName, this._currentUserDTO);
      })
      .catch((e: any) => console.warn(e));
  }

  emitValue(roonName: string, msg: MsgDTO){
    console.log(this._currentUserDTO);
    
    this.connection.invoke('SendMssage', roonName, msg, this._currentUserDTO).catch(() => {
      console.warn('error in webcokect');
    });
  }

}
