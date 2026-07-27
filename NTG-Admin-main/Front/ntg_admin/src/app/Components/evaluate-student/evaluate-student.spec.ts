import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudent } from './evaluate-student';

describe('EvaluateStudent', () => {
  let component: EvaluateStudent;
  let fixture: ComponentFixture<EvaluateStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
