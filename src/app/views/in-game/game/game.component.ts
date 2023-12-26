import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { InGameService } from '../inGame.service';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { take } from 'rxjs';
import { userDTO } from 'src/app/interfaces';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  constructor(
    private _inGameService: InGameService,
    private _chatService: ChatService,
    private _notificationService: NotificationService
  ){}

  ngOnInit(): void {  }
  
  ngOnDestroy() {
    this._inGameService.refreshBoard();
    this._inGameService.leaveTheGame(this._chatService.roomId).pipe(
      take(1)
    ).subscribe(res => console.log(res))
    this._inGameService.playerLeft(
      this._chatService.roomId, 
      this._chatService.currentUserDTO, 
      this._chatService.connection
    );
    this._chatService.disconnectAllConection();
    this._chatService.removeAllMetHods();
  }

}
