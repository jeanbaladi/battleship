import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Board, ResponseHTTP, boardsData, coordinate, ships, shipsInBoard, userDTO } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InGameService extends ApiService {
  public cellsSelected: Array<any> = [];
  private _currentShipSelected!: ships;
  private _currentShipSelectedInBoard!: shipsInBoard;
  private _currentShipElementSelected!: HTMLDivElement;
  private _constShips!: Array<ships>;
  private _ships: BehaviorSubject<Array<ships>> = new BehaviorSubject<Array<ships>>([
    {id:'1', url:"🚢", length:2, dir: 'y', coordinate: null, boatParts: ['🚢','💦']},
    {id:'2', url:"🚢", length:3, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','💦']},
    {id:'3', url:"🚢", length:4, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','🔲','💦']},
    {id:'4', url:"🚢", length:5, dir: 'y', coordinate: null, boatParts: ['🚢','🔲','🔲','🔲','💦']}
  ]);
  private _startGame: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _shipsInBoard: Array<Array<boardsData>> = [];
  private _boardStatus: 'editable' | 'blocked' = 'editable'
  private _boardInPlay: BehaviorSubject<Array<Array<shipsInBoard>>> = new BehaviorSubject<Array<Array<shipsInBoard>>>([]);
  //---shots board

  //--oponente
  private _opponent!: userDTO;
  
  constructor(http: HttpClient) {
    super(http);
    this._constShips = JSON.parse(JSON.stringify(this._ships.getValue()));
  }

  public get boardInPlay(){
    return this._boardInPlay.getValue();;
  }

  public set boardInPlay(value: Array<Array<shipsInBoard>>){
    this._boardInPlay.next(value);
  }

  public watchBoardInGame(): Observable<Array<Array<shipsInBoard>>> {
    return this._boardInPlay.asObservable();
  }

  public readyPlayer(newPlayer: Board): Observable<ResponseHTTP<string>> {
    this._boardStatus = 'blocked';
    const boardsData =JSON.parse(JSON.stringify(newPlayer.boardsData));
    let asd: any[] = [];
    boardsData.forEach((x: Array<shipsInBoard>) => {
      // console.log('fixObject', x);
      x.forEach((j: any) => {
        const objectName = Object.keys(j)[0]
        const newName = 'id';
        j[newName] = j[objectName];
        delete j[objectName]['id']
        delete j[objectName]['url']
        delete j[objectName]['dir']
        delete j[objectName]['idElement']
        delete j[objectName]['status']
        delete j[objectName]['_cellBackgroundColor']
        delete j[objectName]['boatParts']
        delete j[objectName];

      })
    });
    newPlayer.boardsData = boardsData;
    // return new Observable;
    return this.post<ResponseHTTP<string>>('Game', newPlayer);
  }

  public preparedBoard(): Observable<boolean>{
    return this._startGame.asObservable();
  }

  public startGame() {
    console.log('startGame',this.ships.length );
    console.log('startGame',this.shipsInBoard.length);
    this._startGame.next(this.ships.length === 0 && this.shipsInBoard.length === 4);
  }

  public refreshBoard(){
    this._ships.next(JSON.parse(JSON.stringify(this._constShips)));
    this.shipsInBoard = [];
  }

  public DeleteRoom(idRoom: string){
    return this.Delete('room', idRoom);
  }

  public shoot(
    room: string, 
    coordinate: coordinate,
    // identityIduserAttacked: string,
    userAttacking: userDTO, 
    connection: signalR.HubConnection
  ){
    connection.invoke('Shoot', 
      room,
      coordinate,
      // identityIduserAttacked,
      userAttacking).catch(() => {
        console.warn('error in websokect');
      });
  }

  public playerLeft(room: string, user: userDTO, connection: signalR.HubConnection){
    connection.invoke('PlayerLeft', 
    room,
    user).catch(() => {
      console.warn('error in websokect');
    });
  }

  public leaveTheGame(id: string): Observable<string>{
    return this.Delete<string>('Game/player',id);
  }

  public get constShips(): Array<ships>{
    return this._constShips;
  }

  public get boardStatus(): "editable" | "blocked"{
    return this._boardStatus;
  }

  public get opponent(): userDTO{
    return this._opponent;
  }
  
  public set opponent(opponent: userDTO){
    this._opponent = opponent;
  }

  public set shipsInBoard(value : Array<Array<boardsData>>){
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

}
