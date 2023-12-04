import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoutingModule } from './root-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared';
import { AuthService } from '../views/auth/auth.service';
import { NavBarService } from '../shared/nav-bar/nav-bar.service';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    RootRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class RootModule { }