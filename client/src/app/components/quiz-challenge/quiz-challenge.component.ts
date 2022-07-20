import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-challenge',
  templateUrl: './quiz-challenge.component.html',
  styleUrls: ['./quiz-challenge.component.scss']
})
export class QuizChallengeComponent implements OnInit {

  constructor(private router: Router) { }

  permalinkText: string = '';

  ngOnInit(): void {
  }

  fetchQuiz() {
    this.router.navigateByUrl(`/challenge/${this.permalinkText}`);
  }
}
