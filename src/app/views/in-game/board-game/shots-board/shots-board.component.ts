import { Component } from '@angular/core';
import { InGameService } from '../../inGame.service';
import { ResponseHTTP, coordinate, userDTO } from 'src/app/interfaces';
import { AuthService } from 'src/app/views/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-shoots-board',
  templateUrl: './shots-board.component.html',
  styleUrls: ['./shots-board.component.scss']
})
export class ShootsBoardComponent {
  private rows: number = 10;
  private col: number = 10;
  public board: Array<Array<any>> = [];
  public aux: any;
  public lastSelectection: Array<(HTMLElement | null)> = [];
  public repositionShip: Array<any> = [];
  private _element: HTMLDivElement | null = null;
  constructor(
    private _inGameService: InGameService,
    private _authService: AuthService,
    private ActivatedRoute: ActivatedRoute,
    private _chatService: ChatService,
    private _notificationService: NotificationService,
  ){}

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

      this._chatService.connection.on("NotifyUserReady", (user: userDTO) => {
        const msg: string = `
          ${user.identityId !== this._chatService.currentUserDTO.identityId ? user.userName + ' is ready' : 'you are ready'} `;
          this._notificationService.showNotification(msg);
      });
      this._chatService.addMetHods('NotifyUserReady');
    }

    this._chatService.connection.on('shoot', (response: ResponseHTTP<string>, attackIsSuccessful, userAttacking: userDTO) => {
      if(response.isSuccess){
        if(response.result != ""){
          alert(response.result);
        }else{
          const cloneBoard = this._inGameService.boardInPlay;
          //Soy yo quien ataca
          if(userAttacking.identityId === this._chatService.currentUserDTO.identityId){
            if(this._element !== null){
              if(attackIsSuccessful.successful){
                this._element.style.backgroundColor = '#0e836a';
              }else{
                this._element.style.backgroundColor = "#1D1C1A";
              }
            }
          }else{
            //El contricante ataca
            cloneBoard[attackIsSuccessful.coordinate.x][attackIsSuccessful.coordinate.y].status = 'attacked';
            this._inGameService.boardInPlay = cloneBoard;
          }
        }
      }else{
        this._element = null;
        if(userAttacking.identityId === this._chatService.currentUserDTO.identityId){
          this._notificationService.showNotification(response.result);
        }
      }
    });
    this._chatService.addMetHods('shoot');
  }
  shoot(coord: string, element: HTMLDivElement){
    this._element = element;
    const roomId: string = this.ActivatedRoute.snapshot.paramMap.get('gameId') || '';
    const coordinate: coordinate = {x: coord[0], y: coord[2]};
    // const identityIduserAttacked: string = this._inGameService.opponent.identityId;
    const userAttacking: userDTO = this._chatService.currentUserDTO;
    this._inGameService.shoot(
      roomId,
      coordinate,
      // identityIduserAttacked,
      userAttacking,
      this._chatService.connection
    );
    // Shot(string room, Coordinate coordinate,string identityIduserAttacked, UserDTO userAttacking )
  }
}
