import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MsgDTO, userDTO } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { WSService } from 'src/app/services/WSService.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends WSService{
  webSockecketUrl = environment.WebSocket;
  private _connection!: signalR.HubConnection;
  private _currentUserDTO!: userDTO;
  private _roomId: string = '';
  private _metHodsNames: Array<string> = [];
  private _chatRoomName: string = '';
  constructor(private _authService: AuthService) {
    super()
  }

  public startConnection(path : string): void {
    this._currentUserDTO = {
      address: this._authService.authInfo.user.email || '',
      identityId: this._authService.authInfo.user.id,
      userName: this._authService.authInfo.user.userName,
    };
    this._connection = this.connectionBuilder(path);
  }

  emitValue(roonName: string, msg: MsgDTO, metHodName: string){
    this.connection.invoke(metHodName, roonName, msg, this._currentUserDTO).catch((err) => {
      console.warn('WSS','error in websokect', err);
    });
  }

  public get metHods(): Array<string> {
    return this._metHodsNames;
  }

  public addMetHods(...value: Array<string>) {
    value.forEach((method) => {
      this._metHodsNames.push(method);
    })
  }
  public removeAllMetHods() {
    this._metHodsNames = [];
  }
  public removeAMetHods(metHodName: string) {
    const index = this._metHodsNames.indexOf(metHodName);
    this._metHodsNames.splice(index, 1);
  }

  public disconnectAllConection(){
    this._metHodsNames.forEach((method) => {
      this.connection.off(method);
    });
  }
  /**
   * Nombre del metodo para emitir mensajes en el websocket
   */
  public get chatRoomName(): string {
    return this._chatRoomName;
  }

  public set chatRoomName(value: string) {
    this._chatRoomName = value;
  }

  public get roomId(): string {
    return this._roomId;
  }

  public set roomId(value: string) {
    this._roomId = value;
  }


  public get connection(): signalR.HubConnection{
    return this._connection;
  }

  public get currentUserDTO(): userDTO {
    return this._currentUserDTO;
  }

}
