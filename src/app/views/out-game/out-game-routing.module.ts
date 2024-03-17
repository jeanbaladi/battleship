import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { profileGuard } from 'src/app/guard/profileGuard/profile.guard';
import { OutGameComponent } from './out-game-lading/out-game.component';

const routes: Routes = [
  {
    path: '',
    component: OutGameComponent,
    children: [
      {
        path: 'profile', 
        loadChildren : () => import('src/app/views/out-game/profile/profile.module')
        .then(m => m.ProfileModule),
        canActivate:[profileGuard] 
      },
      {
        path:"lobby" , 
        loadChildren : () => import('src/app/views/out-game/lobby/lobby.module')
          .then(m => m.LobbyModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutGameRoutingModule { }