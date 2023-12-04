import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RenewTokenInterceptor } from './interceptor/renewToken.interceptor';
import { AuthService } from './views/auth/auth.service';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { NavBarService } from './shared/nav-bar/nav-bar.service';
import { MaterialModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    NavBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RenewTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
