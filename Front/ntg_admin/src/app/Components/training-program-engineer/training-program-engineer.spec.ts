import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramEngineer } from './training-program-engineer';

describe('TrainingProgramEngineer', () => {
  let component: TrainingProgramEngineer;
  let fixture: ComponentFixture<TrainingProgramEngineer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingProgramEngineer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingProgramEngineer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
