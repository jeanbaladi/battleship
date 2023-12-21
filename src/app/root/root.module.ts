import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoutingModule } from './root-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared';


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