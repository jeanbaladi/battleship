import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'src/app/types';
import { environment } from 'src/environments/environments';
import { user } from 'src/app/interfaces';
import { AuthService } from '../auth.service';

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

  constructor(private _authService: AuthService) {


  }

  ngOnInit(): void {}

  login(user: user){
    this._authService.login(user).subscribe(res => console.log(res));
  }

  setStatus(status : auth) {
    console.log('status', status);
    this.authStatus = status;
    this.dataImg.class = status;
    this.dataImg.src = `../../../../assets/images/${status}.jpg`;
  }

}
