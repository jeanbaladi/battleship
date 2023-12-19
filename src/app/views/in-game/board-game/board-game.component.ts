import { CdkDragDrop, CdkDragStart, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ships, shipsInBoard } from 'src/app/interfaces';
import { InGameService } from '../inGame.service';

// const INITIAL_VALUE: shipsInBoard = {

// }

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGameComponent implements OnInit{
  private rows: number = 10;
  private col: number = 10;
  public board: Array<Array<shipsInBoard>> = [];
  public aux: any;
  public lastSelectection: Array<(HTMLElement | null)> = [];
  public repositionShip: Array<any> = [];
  constructor(private _inGameService: InGameService){}
  @ViewChild('cellWithShip') cellWithShip!: ElementRef;

  ngOnInit(): void {
    let tmp = 0;
    for (let i = 0; i < this.rows; i++) {
      this.board.push([]);
      for (let j = 0; j < this.col; j++) {
        const aux: shipsInBoard = new shipsInBoard()
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
  /**
   * modifica la propiedad 'dir' del objeto tipo ' ships
   */
  @HostListener('window:wheel', ['$event']) 
  onScroll() {
    if(this._inGameService.currentShipSelected){
      this._inGameService.currentShipSelected.dir = 
        this._inGameService.currentShipSelected.dir == 'y' ? 'x' : 'y';
      // if(this._inGameService.currentShipSelectedInBoard){
        const asd = document.getElementById(``);
        
        if(Array.isArray(this._inGameService.currentShipSelected.coordinate)){
            this._inGameService.currentShipSelected.coordinate.forEach((coord) => {
              const x: number = Number(coord.x);
              const y: number = Number(coord.y);
              this.board[x][y].dir = this._inGameService.currentShipSelected.dir;
            })
        }
      // }
      const idx = this._inGameService.ships.findIndex(x => x.id === this._inGameService.currentShipSelected.id);
      this.aux.item.data = this._inGameService.currentShipSelected;
      this.dropped(this.aux, 'rotated');
    }
  }

  dropped(event: any, mode: string) {
    if(!event) return;
    if(!event.item?.data) return;
    if(event.item?.data.boatParts.length == 0) return;

    this.aux = event;
    const data = event.item.data as ships;
    const mainCell = event.container.element.nativeElement;
    let isAShipPositioning: boolean = false;
    let idMainCell = data.dir === 'x' ? mainCell.id[2] : mainCell.id[0];
    if(mainCell.id.includes('selected')) return;

      let cells: (HTMLElement | null)[] = [];
      let tmp: number = Number(idMainCell);
      for (let i = 0; i < data.length; i++) {
        if(data.dir === 'y'){
          let cell = document.getElementById(`${Number(idMainCell) + i}-${mainCell.id[2]}`);
          let cellSelected = document.getElementById(`${Number(idMainCell) + i}-${mainCell.id[2]}selected`);
          if(cell == null && cellSelected == null){
            tmp -= 1;
            cell = document.getElementById(`${tmp}-${mainCell.id[2]}`)
          }
          cells.push(cell)
          this._inGameService.cellsSelected.push(cell);
        }else {
          let cell = document.getElementById(`${mainCell.id[0]}-${Number(idMainCell) + i}`);
          let cellSelected = document.getElementById(`${mainCell.id[0]}-${Number(idMainCell) + i}selected`);
          if(cell == null && cellSelected == null){
            tmp -= 1;
            cell = document.getElementById(`${mainCell.id[0]}-${tmp}`)
          }
          cells.push(cell)
          this._inGameService.cellsSelected.push(cell);
        }
      }
        cells = cells.sort((a,b) => {
          if(a && b){
            const dir = data.dir == 'y' ? 0 : 2;
            const idA = parseInt(a.id[dir]);
            const idB = parseInt(b.id[dir]);
            return idA - idB;
          }
          return 0;
        })
        if(mode !== 'rotated'){
          this.lastSelectection = cells;
        }else if(mode === 'rotated'){
          mode = 'entered';
          this.lastSelectection.forEach((cell) => {
            if(cell){
              this.board[Number(cell.id[0])][Number(cell.id[2])].status = 'empty';
            }
          })
          this.lastSelectection = cells;
        }
        const getOnlyTrueValues = cells.filter((cell) => !! cell);
        cells.forEach(((cell,idx) => {
          if(cell){
            if(mode == 'entered'){
              this.board[Number(cell.id[0])][Number(cell.id[2])].status = 'hover';
              if(getOnlyTrueValues.length !== data.length){
                this.board[Number(cell.id[0])][Number(cell.id[2])].status = 'wrong';
              }
  
            }else if(mode == 'exited') {
              this.board[Number(cell.id[0])][Number(cell.id[2])].status = 'empty';
            }else if(mode == 'dropped'){
              if(getOnlyTrueValues.length !== data.length){
                cell.style.background = '#cecece';
              }else{
                this.board[Number(cell.id[0])][Number(cell.id[2])].status = 'ocuped';
                cell.children[0].innerHTML = `
                  <span class="cdk-drag">
                    ${data.boatParts[idx]}
                  </span>`;
              }
            }
          }
        }))
        if(mode == 'dropped'){
          let tmp: Array<any> = [];
          cells.forEach((cell, cellIndex) => {
            if(cell && getOnlyTrueValues.length === data.length){
              if(Array.isArray(this._inGameService.currentShipSelected.coordinate)){
                
                this._inGameService.currentShipSelected.coordinate.push({x: cell.id[0], y: cell.id[2]});
              }else{
                this._inGameService.currentShipSelected.coordinate = [{x: cell.id[0], y: cell.id[2]}]
              }
              if(cell){
                  this.board[Number(cell.id[0])][Number(cell.id[2])].idElement = cell.id + 'selected';
                  this.board[Number(cell.id[0])][Number(cell.id[2])].id = data.id;
                  this.board[Number(cell.id[0])][Number(cell.id[2])].length = data.length;
                  this.board[Number(cell.id[0])][Number(cell.id[2])].url = data.url;
                  this.board[Number(cell.id[0])][Number(cell.id[2])].dir = data.dir;
                  this.board[Number(cell.id[0])][Number(cell.id[2])].coordinate = data.coordinate;
                  this.board[Number(cell.id[0])][Number(cell.id[2])].boatParts = data.boatParts;
                 
                  tmp.push(this.board[Number(cell.id[0])][Number(cell.id[2])]);
                }
            }
          });
          if(getOnlyTrueValues.length === data.length){
            
            const reduce = tmp.reduce((a:Array<any>,c,i,arr) => {
              if(Array.isArray(a)){
                  const aux = c.id;
                  a = [...a, {[aux]: c}]
              }
              return a;
            },[])
            
            /***Eliminar valores duplicados */
            if(this.repositionShip?.length > 0){
              let getData: number = this.repositionShip[0];
              let idForDelete = Object.keys(getData)[0];
              let indexForDelete: string = '';

              this._inGameService.shipsInBoard.forEach((data, index) => {
                data.forEach((ships: any, i: number) => {
                  if(ships[idForDelete]){
                    indexForDelete = index.toString();
                    return;
                  }
                })
              })
              if(indexForDelete !== '' && !!indexForDelete){
                this._inGameService.shipsInBoard.splice(Number(indexForDelete),1)
              }
            }
            /**********/
            /***********Agregar nuevos valores */
            this._inGameService.shipsInBoard.push(reduce);
            
            if(this.repositionShip.length > 0){
              isAShipPositioning = true;             
              const id = Number(Object.keys( this.repositionShip[0])[0]);
              let getData: number = this.repositionShip[0];
              
              this.repositionShip.forEach((ship, idx) => {
                const coordX = ship[id].coordinate[idx].x;
                const coordY = ship[id].coordinate[idx].y;
                this.board[coordX][coordY].status = 'empty';
                this.board[coordX][coordY].boatParts = [];
                this.board[coordX][coordY].dir = 'y';
                this.board[coordX][coordY].id = this.board[coordX][coordY].id;
                this.board[coordX][coordY].length = 0;
                this.board[coordX][coordY].url = "";
                this.board[coordX][coordY].idElement = 
                  this.board[coordX][coordY].idElement.replace("selected","");
              })
              
              if(Array.isArray(data.coordinate) && data.coordinate !== null){
                if(true){
                  cells.forEach((cell, cellIndex) => {
                    if(data.coordinate){
                      const oldCellsId0 = data.coordinate[cellIndex].x;
                      const oldCellsId1 = data.coordinate[cellIndex].y;
                      const oldCellElement = document.getElementById(`${oldCellsId0}-${oldCellsId1}selected`);
                      
                      if(oldCellElement){
                        oldCellElement.children[0].innerHTML = `${oldCellElement.id.replace('selected', '')}`
                      }
                    }
                  });
                  
                  data.coordinate.splice(0,cells.length)
                }
              }
              this.repositionShip = [];
            }
          }
        }
      if(mode == 'dropped' && cells.filter((cell) => !! cell).length === data.length){
        const arrTmp = this._inGameService.ships;
        const index = arrTmp.findIndex(x => x.id == data.id);
        
        if(!isAShipPositioning){
          arrTmp.splice(index,1);
        }
        this._inGameService.ships = arrTmp;
      }
  }
  test(cdkDragStart: CdkDragStart<shipsInBoard>){
    if(cdkDragStart.source.data.length === 0) return;
    const index: number = Number(cdkDragStart.source.data.id);
    const length: number = Number(cdkDragStart.source.data.length);
    
    const findIdxInService = this._inGameService.shipsInBoard.filter(x => x.length === length)[0];
    this._inGameService.currentShipSelected = cdkDragStart.source.data;
    this.repositionShip = findIdxInService;
  }
}
