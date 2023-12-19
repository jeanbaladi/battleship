import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../Chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MsgDTO, userDTO } from 'src/app/interfaces';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, }),
        animate('500ms', style({ opacity: 1, }))
      ],),
      transition(':leave', [
        style({ opacity: 1, }),  // initial
        animate('500ms',
          style({ opacity: 0, }))  // final
      ])
    ])
  ]
})
export class ChatContentComponent implements OnInit {
  @Input() trigger: boolean = false;
  @Input() room: string = '';

  @ViewChild('chatContentMessages') chatContentMessages!: HTMLDivElement;
  
  public messages: Array<{
    position: 'left' | 'right', 
    sender?: string,
    msg: string
    showSender: boolean}> = []

  public formMsg!: FormGroup;

  constructor(private _chatService: ChatService){}

  ngOnInit(): void {
    this.formMsg = new FormGroup({
      msg: new FormControl('')
    });

    this._chatService.connection.on('ReceiveMessage', (user: userDTO, msg: MsgDTO) => {
      console.log(msg.message);
      
      
      const itsMyMsg = user.identityId === this._chatService.currentUserDTO.identityId;
        if(
          this.messages.length > 0
        ){
          if(
              itsMyMsg && 
              this.messages[this.messages.length - 1].sender === "Me"
            ){
            this.messages.push({
              position: 'left',
              sender: 'Me',
              msg: msg.message,
              showSender: false
            })
          }else{
            this.messages.push({
              position: itsMyMsg ? 'left': 'right',
              sender: itsMyMsg ? 'Me' : user.userName,
              msg: msg.message,
              showSender: this.messages[this.messages.length - 1].sender == user.userName ? false : true
            })
          }
        }else{
          this.messages.push({
            position: itsMyMsg ? 'left': 'right',
            sender: itsMyMsg ? 'Me' : user.userName,
            msg: msg.message,
            showSender: true
          })
        }
        console.log('chatContentMessages', this.chatContentMessages);
        // console.log('chatContentMessages', this.chatContentMessages.scrollHeight);
    })
  }

  sendMsg(){
    // console.log('chatContentMessages',chatContentMessages.scrollHeight);
    // console.log('chatContentMessages',chatContentMessages.offsetHeight);
    
    // chatContentMessages.scrollTo(0,chatContentMessages.scrollHeight)
    const value: MsgDTO = {message: this.formMsg.get('msg')?.value.replaceAll("  ", "")};
    this.formMsg.reset();
    if(!!value.message && value.message !== ' '){
      this._chatService.emitValue(this.room, value);
    }
  }

}
