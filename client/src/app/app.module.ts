import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-7b0bndfn.us.auth0.com',
      clientId: 'Q0i1UUinMoWJkLH4g6JbUXkVs4G9Ay0I'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
