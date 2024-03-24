import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar-component/nav-bar.component';

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
