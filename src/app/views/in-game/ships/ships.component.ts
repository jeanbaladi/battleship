import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ships } from 'src/app/interfaces';
import { InGameService } from '../inGame.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit, OnDestroy{
  public ships: Array<ships> = [];
  public subscriptions: Array<Subscription> = [];
  
  constructor(private _inGameService: InGameService){}

  ngOnInit(): void {
    this.subscriptions.push(
      this._inGameService.handlerShips().subscribe((response: Array<ships>) => {
        this.ships = response;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
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
