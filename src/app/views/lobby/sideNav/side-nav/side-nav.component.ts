import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';
import { ProfileDTO, ResponseHTTP } from 'src/app/interfaces';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public activeUsers: ProfileDTO[] = [];
  private _watchConnectionState$: Subscription;

  constructor(
    private _sideNavService: SideNavService,
    private _chatService: ChatService
  ){
    this._watchConnectionState$ = this._chatService.watchConnectionState().subscribe((res) => {
      if(res == 'Connected'){
        this.watchUserActives()
      }
    })
  }

  ngOnInit(): void {
    this._sideNavService.getAllActiveUsers().subscribe((response: ResponseHTTP<ProfileDTO[]>) => {
      if(response.isSuccess){
        console.log(response.result);
        this.activeUsers = response.result;
      }else{

      }
    })
  }

  ngOnDestroy(): void {
    
  }

  watchUserActives() {
    this._chatService.connection.on('usersActive', (response: string) => {
      if(response !== "err"){
        const resHTTP = JSON.parse(response) as  ResponseHTTP<ProfileDTO[]>
        if(resHTTP.isSuccess){
          this.activeUsers = resHTTP.result;
        }
      }
      
      if(this._watchConnectionState$){
        this._watchConnectionState$.unsubscribe();
      }
    });
    this._chatService.addMetHods('usersActive');
  }

  

}
