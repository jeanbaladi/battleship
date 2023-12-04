import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  toggle(togle: MatDrawer, sideNavBtn: HTMLDivElement){
    console.log(togle);
    console.log(sideNavBtn);
    sideNavBtn.style.opacity = '0';
    togle.toggle();
  }

}
