import { Injectable } from '@angular/core';
import { WSService } from 'src/app/services/WSService.service';
import { AuthService } from 'src/app/views/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidenavWSService extends WSService {

  constructor(private _authService: AuthService) {
    super();
  }
}
