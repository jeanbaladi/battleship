import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guard/authGuard/auth.guard';
import { ProfileModule } from '../views/profile/profile.module';

const routes: Routes = [
  {path:"auth" , loadChildren : () => import('../views/auth/auth.module').then(m => m.AuthModule)},
  {path:"profile" , loadChildren : () => import('../views/profile/profile.module').then(m => m.ProfileModule), canActivate:[authGuard]},
  {path:"lobby" , loadChildren : () => import('../views/lobby/lobby.module').then(m => m.LobbyModule), canActivate:[authGuard]},
  {path:"inGame:idGame" , loadChildren : () => import('../views/in-game/in-game.module').then(m => m.InGameModule), canActivate:[authGuard]},
  {path:"**" , redirectTo:'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
