import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDTO, ResponseHTTP } from 'src/app/interfaces';
import { WSService } from 'src/app/services/WSService.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SideNavService extends ApiService  {
  private crrPath: string = `sessionManager`;

  constructor(http: HttpClient) { 
    super(http);
  }

  public getAllActiveUsers(): Observable<ResponseHTTP<ProfileDTO[]>> {
    return this.get<ResponseHTTP<ProfileDTO[]>>(`${this.crrPath}/getUsers`);
  }


}
