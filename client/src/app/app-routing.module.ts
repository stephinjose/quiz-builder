import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { QuizChallengeComponent } from './components/quiz-challenge/quiz-challenge.component';
import { QuizCreatorComponent } from './components/quiz-creator/quiz-creator.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizTryComponent } from './components/quiz-try/quiz-try.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'challenge',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: QuizListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'challenge',
    component: QuizChallengeComponent,
    pathMatch: 'prefix',
    children: [{
      path: ':permalink',
      component: QuizTryComponent
    }]
  },
  {
    path: 'create',
    component: QuizCreatorComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
