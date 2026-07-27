import { TestBed } from '@angular/core/testing';

import { StudentEvaluation } from './student-evaluation';

describe('StudentEvaluation', () => {
  let service: StudentEvaluation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEvaluation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
