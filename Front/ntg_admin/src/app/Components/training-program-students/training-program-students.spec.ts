import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramStudents } from './training-program-students';

describe('TrainingProgramStudents', () => {
  let component: TrainingProgramStudents;
  let fixture: ComponentFixture<TrainingProgramStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingProgramStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingProgramStudents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
