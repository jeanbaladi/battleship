import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { RootModule } from 'src/app/root/root.module';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthLandingComponent
  ],
  imports: [
    AuthRoutingModule,
    RootModule,
  ],
})
export class AuthModule { }
