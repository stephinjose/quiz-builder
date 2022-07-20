import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.scss']
})
export class QuizCreatorComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  quiz = { title: '', questions: [] } as Quiz;

  ngOnInit(): void {
  }

  addQuestion(single: boolean) {
    this.quiz.questions.push({ type: single ? 'S' : 'M', answers: [] as Answer[] } as Question)
  }

  addAnswer(question: Question) {
    question.answers.push({ text: '', isCorrect: false });
  }

  onSelectionChange(question: Question, answer: Answer) {
    if (question.type === 'S') {
      question.answers.forEach(ans => {
        if (ans !== answer) {
          ans.isCorrect = false;
        }
      });
    }
  }

  isValid(): boolean {
    return true;
  }

  saveQuiz(): void {
    console.log(this.quiz);
    this.apiService.post('/api/quiz/create', this.quiz).subscribe();
  }
}
