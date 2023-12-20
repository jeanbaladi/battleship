import { Component } from '@angular/core';
import { InGameService } from '../../inGame.service';

@Component({
  selector: 'app-shots-board',
  templateUrl: './shots-board.component.html',
  styleUrls: ['./shots-board.component.scss']
})
export class ShotsBoardComponent {
  private rows: number = 10;
  private col: number = 10;
  public board: Array<Array<any>> = [];
  public aux: any;
  public lastSelectection: Array<(HTMLElement | null)> = [];
  public repositionShip: Array<any> = [];

  constructor(private _inGameService: InGameService){}

  ngOnInit(): void {
    let tmp = 0;
    for (let i = 0; i < this.rows; i++) {
      this.board.push([]);
      for (let j = 0; j < this.col; j++) {
        const aux: any = {};
          aux.idElement = `${i}-${j}`,
          aux.status = 'empty',
          aux.boatParts = [],
          aux.coordinate = null,
          aux.dir = 'y',
          aux.id = '0',
          aux.length = 0,
          aux.url = "",
        this.board[i].push(aux);
      }
    }
  }
}
