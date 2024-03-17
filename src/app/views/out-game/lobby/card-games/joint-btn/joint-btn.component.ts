import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CreateGamingRoom } from 'src/app/interfaces';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { NavBarService } from 'src/app/shared/nav-bar/nav-bar.service';

@Component({
  selector: 'app-joint-btn',
  templateUrl: './joint-btn.component.html',
  styleUrls: ['./joint-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JointBtnComponent {
  @Input() gameCreator!: CreateGamingRoom;
  @Input() gameId: string = '';
  @Input() disable: boolean = false;

  constructor(private _navBarService: NavBarService,private _chatService: ChatService,
    private _router: Router){}

  joinGame(){
    console.log('response', this.gameCreator);
    if(!this.disable){
      this._router.navigate([`battleship/inGame/`,this.gameId], { queryParams: { 
        roomName: this.gameCreator.roomName,
        createdBy: this.gameCreator.createdBy,
        maxPlayerForGroup: this.gameCreator.maxPlayerForGroup,
        playerCount: this.gameCreator.playerCount,
        roomCompleted: this.gameCreator.roomCompleted,
      }})
    }

    // this._navBarService.handlerRoutes(`battleship/inGame/`,{room: this.gameCreator},this.gameId);
  }

}
