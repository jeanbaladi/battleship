import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { CurrentGamesComponent } from './current-games/current-games.component';
import { CardGamesComponent } from './card-games/card-games.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JointBtnComponent } from './card-games/joint-btn/joint-btn.component';
import { DeleteGameComponent } from './card-games/delete-game/delete-game.component';
import { RootModule } from 'src/app/root/root.module';
import { LobbyService } from './lobby.service';
import { ChatModule } from 'src/app/shared';


@NgModule({
  declarations: [
    CurrentGamesComponent,
    CardGamesComponent,
    CreateGameComponent,
    JointBtnComponent,
    DeleteGameComponent
  ],
  providers:[LobbyService],
  imports: [
    LobbyRoutingModule,
    ChatModule,
    RootModule,
  ]
})
export class LobbyModule { }
