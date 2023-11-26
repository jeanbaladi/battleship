import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor() {
    this.loginForm = new FormGroup({
      userName : new FormControl('', [
          Validators.required, 
          Validators.pattern('[a-zA-Z ]*'),
          Validators.min(4),
          Validators.minLength(4)]),
      password : new FormControl('', [Validators.required,Validators.min(4)])
    });
  }


  login(): void {
    console.log('login');
  }
}
