import { CdkDragDrop, CdkDragStart, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ships, shipsInBoard } from 'src/app/interfaces';
import { InGameService } from '../inGame.service';

// const INITIAL_VALUE: shipsInBoard = {

// }

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit{

  constructor(private _inGameService: InGameService){}


  ngOnInit(): void {

  }
}
