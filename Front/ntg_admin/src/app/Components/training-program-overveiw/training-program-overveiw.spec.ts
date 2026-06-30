import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramOverveiw } from './training-program-overveiw';

describe('TrainingProgramOverveiw', () => {
  let component: TrainingProgramOverveiw;
  let fixture: ComponentFixture<TrainingProgramOverveiw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingProgramOverveiw]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingProgramOverveiw);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
