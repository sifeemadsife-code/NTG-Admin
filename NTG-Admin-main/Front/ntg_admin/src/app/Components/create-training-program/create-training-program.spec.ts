import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingProgram } from './create-training-program';

describe('CreateTrainingProgram', () => {
  let component: CreateTrainingProgram;
  let fixture: ComponentFixture<CreateTrainingProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingProgram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrainingProgram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
