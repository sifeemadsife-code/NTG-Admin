import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvaluationsView } from './student-evaluations-view';

describe('StudentEvaluationsView', () => {
  let component: StudentEvaluationsView;
  let fixture: ComponentFixture<StudentEvaluationsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEvaluationsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEvaluationsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
