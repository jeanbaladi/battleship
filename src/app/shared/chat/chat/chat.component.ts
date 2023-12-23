import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from '../Chat.service';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { PathsService } from 'src/app/services/paths.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { userDTO } from 'src/app/interfaces';
import { mapper } from 'src/app/utils/mapper';
import { InGameService } from 'src/app/views/in-game/inGame.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public trigger: boolean = false;
  public gameId: string = '';
  constructor(
    private _chatService: ChatService, 
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _inGameService: InGameService
    ){}

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('gameId') || '';
    if(this.gameId){
      this._chatService.startConnection('gameHub');
      this._chatService.AddToGroup(this._chatService.connection, this.gameId, this._chatService.currentUserDTO);
      this._chatService.connection.on('UserAdded', (notification: string, user: userDTO) => {
        console.log("WSS", user.userName);
        console.log("WSS", this._authService.currentUserDTO.identityId);
        console.log("WSS", user);
        if(user.identityId !== this._authService.currentUserDTO.identityId){
          this._inGameService.opponent = user;
        }
        
      });
    }
  }

  triggerChat(){
    this.trigger = !this.trigger;
  }

}
