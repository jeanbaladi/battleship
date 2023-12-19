import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreateGamingRoom, Profile } from 'src/app/interfaces';

const INITIAL_VALUE: CreateGamingRoom = {
  id: '',
  roomName: '',
  createdBy: '',
}

@Component({
  selector: 'app-card-games',
  templateUrl: './card-games.component.html',
  styleUrls: ['./card-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGamesComponent implements OnInit, OnChanges{
  @Input() gameCreator: CreateGamingRoom = INITIAL_VALUE;
  @Input() playerToJoin: string = '';

  constructor(){}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.gameCreator);
   
  }

}
