import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../views/auth/auth.service';
import { userDTO } from '../interfaces';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class WSService {
  private _webSockecketUrl = environment.WebSocket;
  private _connectionState : BehaviorSubject<signalR.HubConnectionState> = new BehaviorSubject<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected);
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
        this._connectionState.next(signalR.HubConnectionState.Connected);
      })
      .then((res) => console.log("WSS", res))
      .catch((e: any) => console.warn(e));
  }

  watchConnectionState(): Observable<signalR.HubConnectionState> {
    return this._connectionState.asObservable();
  }
}
