import { Component, HostListener, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { navbarElements } from 'src/app/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public itemsMenuIsOpen: boolean = false;
  public routes: Array<navbarElements> = [];

  constructor(
    private _navBarService: NavBarService,
    private _authService: AuthService){
   
  }

  ngOnInit(): void {
    this.routes = this._navBarService.Routes;
    if(this._authService.authInfo.roles.includes("guest")){
      let profilePath = this.routes.find(x => x.path == "profile");
      if(profilePath){
        profilePath.isAccessible = false;
      }
    }else{
      this.routes.forEach(r => r.isAccessible = true);
    }
  }

  handlerRoutes(navbarElements: navbarElements){
    const { path } = navbarElements;
    console.log('logout', navbarElements);
    
   navbarElements.method();
  }

  triggerMenu(){
    this.itemsMenuIsOpen = !this.itemsMenuIsOpen;
  }

  closeMenu(){
    console.log('click');
    
    // this.triggerMenu();
    if(this.itemsMenuIsOpen){
      this.itemsMenuIsOpen = false;
    }
  }

}