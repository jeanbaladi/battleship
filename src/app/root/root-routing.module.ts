import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path:"" , loadChildren : () => import('../views/auth/auth.module').then(m => m.AuthModule)},
  {path:"lobby" , loadChildren : () => import('../views/lobby/lobby.module').then(m => m.LobbyModule)},
  {path:"inGame:idGame" , loadChildren : () => import('../views/in-game/in-game.module').then(m => m.InGameModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
