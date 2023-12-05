import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public itemsMenuIsOpen: boolean = false;
  constructor(){
   
  }

  showItems(){
    
  }

  triggerMenu(){
    this.itemsMenuIsOpen = !this.itemsMenuIsOpen;
  }

}
