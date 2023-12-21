import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../views/auth/auth.service';
import { userDTO } from '../interfaces';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export abstract class MiddlewareService {
  private _webSockecketUrl = environment.WebSocket;

  constructor() { }

  public connectionBuilder(path : string): signalR.HubConnection{    
    return new signalR.HubConnectionBuilder()
      .withUrl(`${this._webSockecketUrl}/${path}`,{
              skipNegotiation: true, 
              transport: signalR.HttpTransportType.WebSockets
            }).build();
  }

  AddToGroup(connection: signalR.HubConnection, roonName: string, extras: any){
    connection.start()
      .then(() => {
        connection.invoke('AddToGroup',roonName, extras);
      })
      .catch((e: any) => console.warn(e));
  }
}
