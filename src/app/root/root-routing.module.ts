import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guard/authGuard/auth.guard';
import { ProfileModule } from '../views/profile/profile.module';
import { NavBarModule } from '../shared/nav-bar/nav-bar.module';

const routes: Routes = [
  {path:"auth" , loadChildren : () => import('../views/auth/auth.module').then(m => m.AuthModule)},
  {path:"battleship" , loadChildren : () => import('../shared/nav-bar/nav-bar.module').then(m => m.NavBarModule), canActivate:[authGuard]},
  {path:"**" , redirectTo:'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
