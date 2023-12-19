import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { NavBarService } from 'src/app/shared/nav-bar/nav-bar.service';

@Component({
  selector: 'app-joint-btn',
  templateUrl: './joint-btn.component.html',
  styleUrls: ['./joint-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JointBtnComponent {
  @Input() gameId: string = '';

  constructor(private _navBarService: NavBarService,private _chatService: ChatService){}

  joinGame(){
    this._navBarService.handlerRoutes(`battleship/inGame/`,{},this.gameId);
  }

}
