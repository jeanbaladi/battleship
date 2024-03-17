import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guard/authGuard/auth.guard';
import { NavBarComponent } from './nav-bar-component/nav-bar.component';
import { InGameModule } from 'src/app/views/in-game/in-game.module';
import { profileGuard } from 'src/app/guard/profileGuard/profile.guard';
import { LobbyModule } from 'src/app/views/out-game/lobby/lobby.module';
import { ProfileModule } from 'src/app/views/out-game/profile/profile.module';
import { OutGameModule } from 'src/app/views/out-game/out-game.module';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      {
        path:"outGame" , loadChildren : () => import('src/app/views/out-game/out-game.module')
          .then(m => m.OutGameModule),
      },
      {
        path:"inGame/:gameId" , loadChildren : () => import('src/app/views/in-game/in-game.module')
          .then(m => m.InGameModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavBarRoutingModule { }
