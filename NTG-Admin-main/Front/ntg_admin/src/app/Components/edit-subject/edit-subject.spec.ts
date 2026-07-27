import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubject } from './edit-subject';

describe('EditSubject', () => {
  let component: EditSubject;
  let fixture: ComponentFixture<EditSubject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
