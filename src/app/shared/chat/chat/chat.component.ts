import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from '../Chat.service';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { PathsService } from 'src/app/services/paths.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import { userDTO } from 'src/app/interfaces';
import { mapper } from 'src/app/utils/mapper';

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
    ){}

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('gameId') || '';
    if(this.gameId){
      this._chatService.startConnection('chat');
      this._chatService.AddToGroup(this._chatService.connection, this.gameId, this._chatService.currentUserDTO);
    }
  }

  triggerChat(){
    this.trigger = !this.trigger;
  }

}
