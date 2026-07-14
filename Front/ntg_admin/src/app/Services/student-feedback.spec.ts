import { TestBed } from '@angular/core/testing';

import { StudentFeedback } from './student-feedback';

describe('StudentFeedback', () => {
  let service: StudentFeedback;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFeedback);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
