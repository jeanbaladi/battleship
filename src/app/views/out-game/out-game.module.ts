import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModule } from 'src/app/root/root.module';
import { OutGameRoutingModule } from './out-game-routing.module';
import { SideNavComponent } from './lobby/sideNav/side-nav/side-nav.component';
import { OutGameComponent } from './out-game-lading/out-game.component';
import { ChatModule } from 'src/app/shared';
import { LobbyService } from './lobby/lobby.service';



@NgModule({
  declarations: [
    SideNavComponent,
    OutGameComponent
  ],
  providers:[LobbyService],
  imports: [
    OutGameRoutingModule,
    RootModule,
    ChatModule
  ]
})
export class OutGameModule { }
