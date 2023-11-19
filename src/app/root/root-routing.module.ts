import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../views/auth/auth.module';


const routes: Routes = [
  {path:"" , loadChildren : () => import('../views/auth/auth.module').then(m => m.AuthModule)},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
