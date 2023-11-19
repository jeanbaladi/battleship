import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InGameRoutingModule } from './in-game-routing.module';
import { BoardGameComponent } from './board-game/board-game.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    BoardGameComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    InGameRoutingModule
  ]
})
export class InGameModule { }
