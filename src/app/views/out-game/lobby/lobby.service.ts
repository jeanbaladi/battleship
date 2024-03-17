import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Observable, Subject } from 'rxjs';
import { CreateGamingRoom, ResponseHTTP } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LobbyService extends ApiService {

  private _currentRooms: Subject<Array<CreateGamingRoom>> = new Subject<Array<CreateGamingRoom>>();

  constructor(http: HttpClient) {
    super(http);
  }

  getAllRooms(): Observable<ResponseHTTP<Array<CreateGamingRoom>>> {
    return this.get<ResponseHTTP<Array<CreateGamingRoom>>>('room');
  }

  public WatchCurrentRooms() 
  {
    return this._currentRooms.asObservable();
  }
  public set CurrentRooms(rooms: Array<CreateGamingRoom>) 
  {
    this._currentRooms.next(rooms);
  }

}
