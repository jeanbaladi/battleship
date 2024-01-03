import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces';
import { auth } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public loginForm! : FormGroup;
  @Output('createAccount') createAccount : EventEmitter<auth> = new EventEmitter<auth>();
  @Output('access') access : EventEmitter<user> = new EventEmitter<user>();
  constructor() {
    this.loginForm = new FormGroup({
      Name : new FormControl('string', [
          Validators.required, 
          Validators.min(4),
          Validators.minLength(4)]),
      Password : new FormControl('String123+', [Validators.required,Validators.min(4)])
    });
  }


  login(): void {
    if(this.loginForm.valid){
      this.access.emit(this.loginForm.value as user);
    }
  }
}
