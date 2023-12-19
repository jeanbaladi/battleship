import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ships, shipsInBoard } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InGameService {
  // currentCellsSelected: Subject<Array<any>> = new Subject<Array<any>>();
  // prevCellsSelected: Subject<Array<any>> = new Subject<Array<any>>();
  // cellsSelected: Subject<Array<any>> = new Subject<Array<any>>();

  public cellsSelected: Array<any> = [];
  private _currentShipSelected!: ships;
  private _currentShipSelectedInBoard!: shipsInBoard;
  private _currentShipElementSelected!: HTMLDivElement;
  private _ships: BehaviorSubject<Array<ships>> = new BehaviorSubject<Array<ships>>([
    {id:'1', url:"🚢", length:2, dir: 'y', coordinate: null, boatParts: ['🚢','💦']},
    {id:'2', url:"🚢", length:3, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','💦']},
    {id:'3', url:"🚢", length:4, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','🔲','💦']},
    {id:'4', url:"🚢", length:5, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','🔲','🔲','💦']}
  ])

  private _shipsInBoard: Array<any> = [];

  constructor() { }

  public set shipsInBoard(value : Array<any>){
    this._shipsInBoard = value;
  }
  public get shipsInBoard(){
    return this._shipsInBoard;
  }

  public set currentShipElementSelected(value: HTMLDivElement){
    this._currentShipElementSelected = value;
  }

  public get currentShipElementSelected(){
    return this._currentShipElementSelected;
  }
  
  public set currentShipSelectedInBoard(value: shipsInBoard){
    this._currentShipSelectedInBoard = value;
  }

  public get currentShipSelectedInBoard(){
    return this._currentShipSelectedInBoard;
  }
  
  public set currentShipSelected(value: ships){
    this._currentShipSelected = value;
  }

  public get currentShipSelected(){
    return this._currentShipSelected;
  }
  
  public set ships(value: Array<ships>){
    this._ships.next(value);
  }

  public get ships(){
    return this._ships.getValue();
  }

  public handlerShips(): Observable<Array<ships>> {
    return this._ships.asObservable();
  }

  // public watchCurrentCellsSelected(): Observable<Array<any>> {
  //   return this.currentCellsSelected.asObservable();
  // }
  // public watchPrevCellsSelected(): Observable<Array<any>> {
  //   return this.prevCellsSelected.asObservable();
  // }
  // public watchCellsSelected(): Observable<Array<any>> {
  //   return this.cellsSelected.asObservable();
  // }

}
