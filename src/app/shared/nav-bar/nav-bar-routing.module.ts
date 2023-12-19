import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guard/authGuard/auth.guard';
import { ProfileModule } from 'src/app/views/profile/profile.module';
import { NavBarComponent } from './nav-bar-component/nav-bar.component';
import { LobbyModule } from 'src/app/views/lobby/lobby.module';
import { InGameModule } from 'src/app/views/in-game/in-game.module';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      { 
        path: 'profile', 
        loadChildren : () => import('src/app/views/profile/profile.module')
        .then(m => m.ProfileModule), 
      },
      {
        path:"lobby" , 
        loadChildren : () => import('src/app/views/lobby/lobby.module')
          .then(m => m.LobbyModule),
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
