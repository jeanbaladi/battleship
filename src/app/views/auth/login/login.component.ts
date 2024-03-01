import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces';
import { auth } from 'src/app/types';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public loginForm! : FormGroup;
  @Output('createAccount') createAccount : EventEmitter<auth> = new EventEmitter<auth>();
  @Output('guestAccess') guestAccess : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('access') access : EventEmitter<user> = new EventEmitter<user>();
  constructor() {
    this.loginForm = new FormGroup({
      Name : new FormControl(environment.production ? '' : 'string', [
        Validators.required, 
        Validators.min(4),
        Validators.minLength(4)]
      ),
      Password : new FormControl(environment.production ? '' : 'String123+', [
        Validators.required,
        Validators.min(4)
      ])
    });
  }


  login(): void {
    if(this.loginForm.valid){
      this.access.emit(this.loginForm.value as user);
    }
  }
  guestUserAccess(){
    this.guestAccess.emit(true);
  }
}
