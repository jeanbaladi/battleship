import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { InGameService } from '../inGame.service';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { take } from 'rxjs';
import { ResponseHTTP, boardsData, shipsInBoard, userDTO } from 'src/app/interfaces';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  constructor(
    private _inGameService: InGameService,
    private _chatService: ChatService,
    private _route: ActivatedRoute,
  ){}

  ngOnInit(): void { 
    this._chatService.roomId = this._route.snapshot.paramMap.get('gameId') || '';
    this._chatService.chatRoomName = 'SendMssage';
  }
  
  ngOnDestroy() {
    this._destroyComponent(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    // Emitir el evento antes de recargar la página
    this._destroyComponent(true);
  }

  private _destroyComponent(pageUpdated: boolean)
  {
    this._inGameService.playerLeft(
      this._chatService.roomId, 
      this._chatService.currentUserDTO, 
      this._chatService.connection,
      pageUpdated
    );
    if(this._chatService.roomId){
      this._inGameService.leaveTheGame(this._chatService.roomId).pipe(
        take(1)
      ).subscribe(res => console.log(res))
    }
    this._chatService.disconnectAllConection();
    this._chatService.removeAllMetHods();
    this._inGameService.returnToInitialState();
  }

}
