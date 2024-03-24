import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlSimultaneousSessionsInterceptor } from './interceptor/controlSimultaneousSessions.interceptor';
import { RenewTokenInterceptor } from './interceptor/renewToken.interceptor';
import { NotificationService } from './services/notifications/notification.service';
import { MaterialModule } from './shared';
import { ChatService } from './shared/chat/Chat.service';
import { ItemsComponent } from './shared/nav-bar/items/items.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar-component/nav-bar.component';
import { NavBarService } from './shared/nav-bar/nav-bar.service';
import { AuthService } from './views/auth/auth.service';
import { ProfileService } from './views/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ItemsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    provideAnimations(),
    AuthService,
    ChatService,
    ProfileService,
    NotificationService,
    NavBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ControlSimultaneousSessionsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RenewTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
