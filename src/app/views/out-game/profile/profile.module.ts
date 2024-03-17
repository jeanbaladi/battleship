import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLandingComponent } from './profile-landing/profile-landing.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { GamesPlayedComponent } from './games-played/games-played.component';
import { RootModule } from 'src/app/root/root.module';


@NgModule({
  declarations: [
    ProfileLandingComponent,
    UserInformationComponent,
    GamesPlayedComponent
  ],
  imports: [
    ProfileRoutingModule,
    RootModule
  ]
})
export class ProfileModule { }
