import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ships } from 'src/app/interfaces';
import { InGameService } from '../inGame.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit{
  public ships: Array<ships> = [];
  
  constructor(private _inGameService: InGameService){}

  ngOnInit(): void {
    this.ships = this._inGameService.ships;
  }

  dropped(event: CdkDragDrop<Array<ships>>, shipElement: HTMLElement ) {
    // console.log(event.item.element.nativeElement);
    // console.log(shipElement);
    // console.log(event.previousContainer.element.nativeElement);
    // console.log(event.container.element.nativeElement);
  }
  started(event: CdkDragStart, ship: ships, shipElement: HTMLDivElement){
    this._inGameService.currentShipSelected = ship;
    this._inGameService.currentShipElementSelected = shipElement;
  }

}
