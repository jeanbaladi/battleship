import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { navbarElements } from 'src/app/interfaces';
import { PathsService } from 'src/app/services/paths.service';
import { AuthService } from 'src/app/views/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService extends PathsService {

  constructor(router: Router, AuthServie: AuthService) { 
    super(router,AuthServie);
  }
  
}

