import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-current-games',
  templateUrl: './current-games.component.html',
  styleUrls: ['./current-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentGamesComponent {

}
