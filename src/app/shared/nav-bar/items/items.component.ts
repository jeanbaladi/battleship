import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0)' }),
        animate('500ms', style({ opacity: 1,  transform: 'translateY(40px)' }))
      ],),
      transition(':leave', [
        style({ opacity: 1,  transform: 'translateY(40px)' }),  // initial
        animate('500ms',
          style({ opacity: 0, transform: 'translateY(0)'}))  // final
      ])
    ])
  ]
})
export class ItemsComponent {
  @Input() itemsMenuIsOpen: boolean = true;
  @Output() itemsMenuIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public routes: Array<string> = [];
  constructor(private navBarService: NavBarService){
    this.routes = this.navBarService.routes;
  }

  triggerMenu(){
    this.itemsMenuIsOpen = !this.itemsMenuIsOpen;
  }
}
