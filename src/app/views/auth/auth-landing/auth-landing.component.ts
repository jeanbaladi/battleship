import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'src/app/types';
import { environment } from 'src/environments/environments';
import { user, Auth, ResponseHTTP } from 'src/app/interfaces'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/shared/nav-bar/nav-bar.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLandingComponent implements OnInit {
  
  public authStatus : auth = 'login';
  public dataImg : {src: string, alt:string, class: auth} = {
    src: `../../../../assets/images/${this.authStatus}.jpg`,
    alt: `${this.authStatus} image`,
    class: this.authStatus
  };
  public pswRequirements: string[] = [];

  constructor(
    private _authService: AuthService, 
    private _navBarService: NavBarService,
    private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
    localStorage.setItem("SessionId", "unlogged");
    this.pswRequirements = Object.values(this._authService.pswRequirements);
  }

  login(user: user){
    this._authService.login(user).subscribe((response: ResponseHTTP<Auth>) => {
      if(response.isSuccess){
        this.loginSuccess();
      }else{
        console.log('error', response.result);
      }
    });
  }

  guestUserAccess(){
    this._authService.guestUserAccess().subscribe(response => 
      {
        if(response.isSuccess){
          this.loginSuccess();
        }else{
          console.warn('error', response.result);
        }
      });
  }

  public loginSuccess(){
    this._navBarService.Routes.find((r) => r.path == 'profile')?.method();
  }

  setStatus(status : auth) {
    this.authStatus = status;
    this.dataImg.class = status;
    this.dataImg.src = `../../../../assets/images/${status}.jpg`;
  }

  register(user: user){
    this._authService.register(user).subscribe((res:ResponseHTTP<Auth>) => 
      {
        if(res.isSuccess){
          this._notificationService.showNotification("your account has been created successfully");
        }
      },(error:HttpErrorResponse)=>{
        if(error){
          console.log(error);
          if(error?.error?.result){
            this._notificationService.showNotification(error?.error?.result[0].description);
          }
        }
      }
    )
  }
}