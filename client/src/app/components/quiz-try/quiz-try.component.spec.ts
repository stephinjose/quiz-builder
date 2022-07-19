import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTryComponent } from './quiz-try.component';

describe('QuizTryComponent', () => {
  let component: QuizTryComponent;
  let fixture: ComponentFixture<QuizTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizTryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
