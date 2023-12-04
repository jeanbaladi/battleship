import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'src/app/types';
import { environment } from 'src/environments/environments';
import { user } from 'src/app/interfaces';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private _authService: AuthService, private route: Router) {


  }

  ngOnInit(): void {}

  login(user: user){
    this._authService.login(user).subscribe((response) => {
      if(response){
        this.loginSuccess();
      }else{
        console.log('error', response);
      }
    });
  }

  public loginSuccess(){
    this.route.navigate([`battleship/profile/${this._authService.currentUser.profile.identityId}`]);
  }

  setStatus(status : auth) {;
    this.authStatus = status;
    this.dataImg.class = status;
    this.dataImg.src = `../../../../assets/images/${status}.jpg`;
  }
}