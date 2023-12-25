import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../material/material.module';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ChatComponent,
    ChatContentComponent,
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
