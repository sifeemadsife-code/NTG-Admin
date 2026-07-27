import { TestBed } from '@angular/core/testing';

import { EngineerFeedback } from './engineer-feedback';

describe('EngineerFeedback', () => {
  let service: EngineerFeedback;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineerFeedback);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
