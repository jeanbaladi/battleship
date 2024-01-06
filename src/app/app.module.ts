import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RenewTokenInterceptor } from './interceptor/renewToken.interceptor';
import { AuthService } from './views/auth/auth.service';
import { NavBarComponent } from './shared/nav-bar/nav-bar-component/nav-bar.component';
import { NavBarService } from './shared/nav-bar/nav-bar.service';
import { MaterialModule } from './shared';
import { ItemsComponent } from './shared/nav-bar/items/items.component';
import { ChatService } from './shared/chat/Chat.service';
import { NotificationService } from './services/notifications/notification.service';
import { ProfileService } from './views/profile.service';
import { ControlSimultaneousSessionsInterceptor } from './interceptor/controlSimultaneousSessions.interceptor';

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
      useClass: RenewTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ControlSimultaneousSessionsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
