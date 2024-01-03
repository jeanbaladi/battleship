import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateGamingRoom, CreateGamingRoomDTO } from 'src/app/interfaces';
import { ChatService } from 'src/app/shared/chat/Chat.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  public form!: FormGroup;


  constructor(private _chatService: ChatService){
    this.form = new FormGroup({
      roomName : new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {}

  createNewRoom() {
    if(this.form.valid){
      const createGamingRoom: CreateGamingRoomDTO = 
        {
          createdBy: this._chatService.currentUserDTO.userName,
          roomName: this.form.get('roomName')?.value
        }
      this._chatService.connection.invoke('CreateGamingRoom', createGamingRoom)
        .catch((err) => {
          console.warn('WSS','error in websokect', err);
        });
    }
  }

}
