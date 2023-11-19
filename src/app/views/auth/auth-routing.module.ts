import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';

const routes: Routes = [
  {path:'' , component: AuthLandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
