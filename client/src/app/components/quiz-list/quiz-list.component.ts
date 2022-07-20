import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  quizzes: Quiz[] | null = null;

  ngOnInit(): void {
      this.apiService.get<Quiz[]>('/api/quiz/list').subscribe((res) => this.quizzes = res);
  }

}
