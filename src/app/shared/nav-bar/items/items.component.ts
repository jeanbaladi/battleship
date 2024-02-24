import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { navbarElements } from 'src/app/interfaces';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0)' }),
        animate('500ms', style({ opacity: 1,  transform: 'translateY(100px)' }))
      ],),
      transition(':leave', [
        style({ opacity: 1,  transform: 'translateY(100px)' }),  // initial
        animate('500ms',
          style({ opacity: 0, transform: 'translateY(0)'}))  // final
      ])
    ])
  ]
})
export class ItemsComponent implements OnChanges {
  @Input() itemsMenuIsOpen: boolean = true;
  @Output() itemsMenuIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() routeChanged: EventEmitter<navbarElements> = new EventEmitter<navbarElements>();
  @Input() routes: Array<navbarElements> = [];

  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    console.log('changes', this.itemsMenuIsOpen);
    
  }

  triggerMenu(){
    this.itemsMenuIsOpen = !this.itemsMenuIsOpen;
  }
  selectedRotue(route: navbarElements){
    this.routeChanged.emit(route);
  }
}
