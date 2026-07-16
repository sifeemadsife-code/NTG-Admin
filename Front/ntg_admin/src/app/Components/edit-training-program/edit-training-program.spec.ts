import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingProgram } from './edit-training-program';

describe('EditTrainingProgram', () => {
  let component: EditTrainingProgram;
  let fixture: ComponentFixture<EditTrainingProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrainingProgram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingProgram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
