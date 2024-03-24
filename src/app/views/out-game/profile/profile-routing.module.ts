import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileLandingComponent } from './profile-landing/profile-landing.component';
import { profileGuard } from 'src/app/guard/profileGuard/profile.guard';

const routes: Routes = [
  {path:':id' , component: ProfileLandingComponent, canActivate:[profileGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
