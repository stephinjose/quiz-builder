import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, forkJoin, Subscription, switchMap, tap } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { ExamResults } from 'src/app/models/exam-result';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { ValidationResults } from 'src/app/models/validation-results';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-template',
  templateUrl: './quiz-template.component.html',
  styleUrls: ['./quiz-template.component.scss']
})
export class QuizTemplateComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  @Input()
  Mode: 'CREATE' | 'TRY' = 'CREATE';

  quiz: Quiz | null = null;
  results: ExamResults | null = null;

  subs: Subscription[] = [];

  Object = Object;
  ngOnInit(): void {
    if (this.Mode === 'CREATE') {
      this.quiz = { title: '', questions: [] as Question[] } as Quiz;
    }
    else {
      const sub = this.route.params.pipe(switchMap((val) => {
        console.log(val);
        return this.apiService.get<Quiz>(`/api/quiz/retrieve/${val['permalink']}`).pipe(
          catchError((err) => { console.log(err); return EMPTY; })
        )
      }))
        .subscribe((quiz) => this.quiz = quiz);
      this.subs.push(sub);
    }
  }

  addQuestion(single: boolean) {
    this.quiz!.questions.push({ type: single ? 'S' : 'M', answers: [] as Answer[] } as Question)
  }

  addAnswer(question: Question) {
    question.answers.push({ text: '', isCorrect: false });
  }

  removeQuestion(question: Question) {
    this.quiz?.questions.splice(this.quiz.questions.indexOf(question), 1);
  }

  removeAnswer(question: Question, answer: Answer) {
    question.answers.splice(question.answers.indexOf(answer), 1);
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

  saveQuiz(): void {
    console.log(this.quiz);
    this.apiService.post('/api/quiz/create', this.quiz).subscribe(
      () => {
        this.router.navigateByUrl('/list');
      }
    );
  }

  viewResults(resultTemplate: TemplateRef<any>): void {
    var dialogRef = this.dialog.open(resultTemplate);
    forkJoin([dialogRef.afterClosed(),
    this.apiService.post<ExamResults>('/api/quiz/verify', this.quiz).pipe(tap((val) => {
      this.results = val;
    }))]).subscribe(() => {
      this.results = null;
    });
  }

  isValid(): boolean {
    return this._validate(this.quiz!).success;
  }

  _validate(quiz: Quiz): ValidationResults {
    var results = {} as ValidationResults;
    results.success = true;

    if (quiz == null) {
      this._addError(results, "Quiz is null");
      return results;
    }
    if (!quiz.title || !quiz.title.length) {
      this._addError(results, "Quiz title is missing");
    }
    if (quiz.questions == null || quiz.questions.length == 0) {
      this._addError(results, "Questions array not found or is empty");
      return results;
    }
    for (var question of quiz.questions) {
      if (!question.text || !question.text.length) {
        this._addError(results, "Question text is missing");
      }
      if (question.type != 'M' && question.type != 'S') {
        this._addError(results, "Invalid question type (Should be 'S' or 'M')");
      }
      else {
        if (question.answers == null || question.answers.length == 0) {
          this._addError(results, "No answer added for the question");
          break;
        }
        var correctAnswerFound = false;
        for (var answer of question.answers) {
          if (!answer.text || !answer.text.length) {
            this._addError(results, "Answer text is missing");
          }
          if (question.type == 'S') {
            if (answer.isCorrect) {
              if (correctAnswerFound) {
                this._addError(results, "Multiple correct answer marked for single answer type question");
                break;
              }
              else {
                correctAnswerFound = true;
              }
            }
          }
        }
        if (!correctAnswerFound && question.type == 'S') {
          this._addError(results, "No answer marked correct for single answer type question");
        }
      }
    }
    return results;
  }

  private _addError(results: ValidationResults, error: string): void {
    results.success = false;
    if (results.errors == null) {
      results.errors = [];
    }
    results.errors.push(error);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
