import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteStudent } from './write-student';

describe('WriteStudent', () => {
  let component: WriteStudent;
  let fixture: ComponentFixture<WriteStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
