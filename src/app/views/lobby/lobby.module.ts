import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { CurrentGamesComponent } from './current-games/current-games.component';
import { CardGamesComponent } from './card-games/card-games.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JointBtnComponent } from './card-games/joint-btn/joint-btn.component';
import { DeleteGameComponent } from './card-games/delete-game/delete-game.component';


@NgModule({
  declarations: [
    CurrentGamesComponent,
    CardGamesComponent,
    CreateGameComponent,
    JointBtnComponent,
    DeleteGameComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
