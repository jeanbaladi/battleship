import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'src/app/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  @Output('login') login : EventEmitter<auth> = new EventEmitter<auth>();
  public registerForm! : FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      Name : new FormControl('', [Validators.required]),
      Password : new FormControl('', [Validators.required])
    });
  }

  register(): void {
    console.log('register');
    
  }

}
