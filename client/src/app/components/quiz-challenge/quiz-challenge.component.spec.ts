import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizChallengeComponent } from './quiz-challenge.component';

describe('QuizChallengeComponent', () => {
  let component: QuizChallengeComponent;
  let fixture: ComponentFixture<QuizChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
