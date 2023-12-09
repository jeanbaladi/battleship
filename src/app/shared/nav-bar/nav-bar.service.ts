import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { navbarElements } from 'src/app/interfaces';
import { PathsService } from 'src/app/services/paths.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService extends PathsService {

  constructor(router: Router,) { 
    super(router);
  }

  
  public routes(): Array<navbarElements> {
    return this.Routes;
  }

  handlerRoutes(path: string){
    this.router.navigate([`/${path}`])
  }
}

