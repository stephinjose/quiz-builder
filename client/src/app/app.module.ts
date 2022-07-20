import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizCreatorComponent } from './components/quiz-creator/quiz-creator.component';
import { QuizChallengeComponent } from './components/quiz-challenge/quiz-challenge.component';
import { QuizTryComponent } from './components/quiz-try/quiz-try.component';
import { FormsModule } from '@angular/forms';
import { QuizTemplateComponent } from './components/quiz-template/quiz-template.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    QuizListComponent,
    QuizCreatorComponent,
    QuizChallengeComponent,
    QuizTryComponent,
    QuizTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    AuthModule.forRoot({
      domain: 'dev-7b0bndfn.us.auth0.com',
      clientId: 'Q0i1UUinMoWJkLH4g6JbUXkVs4G9Ay0I',
      audience: "http://localhost:4200/api",
      scope: 'email',
      httpInterceptor: {
        allowedList: [
          {
            uri: '/api/*',
            allowAnonymous: true,
            tokenOptions: { audience: "http://localhost:4200/api" }
          }
        ]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
