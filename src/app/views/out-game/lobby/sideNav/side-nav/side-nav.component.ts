import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';
import { ProfileDTO, ResponseHTTP, userDTO } from 'src/app/interfaces';
import { ChatService } from 'src/app/shared/chat/Chat.service';
import { Subscription } from 'rxjs';
import { NavBarService } from 'src/app/shared/nav-bar/nav-bar.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public activeUsers: ProfileDTO[] = [];
  private _watchConnectionState$: Subscription = new Subscription();
  public isOpenUserPanel: boolean = false;
  public forceOpenPanel: boolean = false;

  constructor(
    private _sideNavService: SideNavService,
    private _chatService: ChatService,
    private _navBarService: NavBarService,
    
  ){
    
  }

  ngOnInit(): void {
    this._sideNavService.getAllActiveUsers().subscribe((response: ResponseHTTP<ProfileDTO[]>) => {
      if(response.isSuccess){
        this.activeUsers = response.result;
      }else{

      }
    });
    this._watchConnectionState$ = this._chatService.watchConnectionState().subscribe((res) => {
      console.log('debugger',res);
      if(res == 'Connected'){
        this.watchUserActives()
      }
    })
  }

  ngOnDestroy(): void {
    
  }

  watchUserActives() {
    this._chatService.connection.on('usersActive', (response: string) => {
      console.log('debugger',response);
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

  goToProfile(user: userDTO) {
    const profileRoute = this._navBarService.Routes.find(r => r.path == "profile")
    if(profileRoute){
      profileRoute.method(user.identityId, {userName: user.userName});
    }
  }

  panelHandler(open: boolean) {
    if(this.forceOpenPanel) return;
    this.isOpenUserPanel = open;
  }

  openPanel(state: boolean) {
    this.forceOpenPanel = state;
    this.isOpenUserPanel = this.forceOpenPanel;
  }
  

}