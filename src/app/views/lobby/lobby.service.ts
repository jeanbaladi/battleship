import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { CreateGamingRoom, ResponseHTTP } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LobbyService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAllRooms(): Observable<ResponseHTTP<Array<CreateGamingRoom>>> {
    return this.get<ResponseHTTP<Array<CreateGamingRoom>>>('room');
  }

}
