import { NgModule } from '@angular/core';

import { RootModule } from 'src/app/root/root.module';
import { GamesPlayedComponent } from './games-played/games-played.component';
import { ProfileLandingComponent } from './profile-landing/profile-landing.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserInformationComponent } from './user-information/user-information.component';


@NgModule({
  declarations: [
    ProfileLandingComponent,
    UserInformationComponent,
    GamesPlayedComponent,
  ],
  imports: [
    ProfileRoutingModule,
    RootModule
  ]
})
export class ProfileModule { }
