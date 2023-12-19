import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InGameRoutingModule } from './in-game-routing.module';
import { BoardGameComponent } from './board-game/board-game.component';
import { GameComponent } from './game/game.component';
import { InGameService } from './inGame.service';
import { ChatComponent } from 'src/app/shared/chat/chat/chat.component';
import { ChatModule } from 'src/app/shared';
import { ShipsComponent } from './ships/ships.component';
import { RootModule } from 'src/app/root/root.module';


@NgModule({
  declarations: [
    BoardGameComponent,
    GameComponent,
    ShipsComponent,
  ],
  providers: [InGameService],
  imports: [
    InGameRoutingModule,
    ChatModule,
    RootModule,
  ]
})
export class InGameModule { }
