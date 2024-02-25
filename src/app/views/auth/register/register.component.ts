import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPsw, user } from 'src/app/interfaces';
import { auth } from 'src/app/types';
import { pswValidator } from 'src/app/validators/pswValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnChanges {
  @Output('register') createUser : EventEmitter<user> = new EventEmitter<user>();
  @Output('login') login : EventEmitter<auth> = new EventEmitter<auth>();
  @Input('pswRequirements') pswRequirements: string[] = [];
  public checkPsw: checkPsw[] = [];
  public registerForm! : FormGroup;
  public progressBar: number = 0;
  private _pswMinLength: number = 6;

  constructor() {
    this.registerForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, pswValidator(),Validators.minLength(this._pswMinLength)])
    });
    this.progressBar = 100 / this._pswMinLength;
  }
  
  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pswRequirements']){
      this.checkPsw = [];
      (changes['pswRequirements'].currentValue as string[]).forEach((req) => {
        this.checkPsw.push({errMsg: req, valid: false});
      })
    }
  }
  

  register(): void {
    if(this.registerForm.valid){
      this.createUser.emit(this.registerForm.value as user);
    }
  }

  checkRequirements():void {
    const errors: any = this.registerForm.get('password')?.errors;
    this.checkPsw.forEach(({errMsg, valid}, i) => {
      if(errors?.hasOwnProperty("msg")){
        if(errors){
          if((errors['msg'] as string[])?.length == 0){
            this.checkPsw[i].valid = true;
          }
          (errors['msg'] as string[]).forEach((err: string) => {
            if(!(errors['msg'] as string[]).includes(errMsg)){
              this.checkPsw[i].valid = true;
            }
            if(errMsg == err){
              this.checkPsw[i].valid = false;
            }
          })
        }
      }else{
        this.checkPsw.forEach(req => req.valid = true);
      }
    });
  }

}
