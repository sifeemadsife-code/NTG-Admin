import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEngineers } from './add-engineers';

describe('AddEngineers', () => {
  let component: AddEngineers;
  let fixture: ComponentFixture<AddEngineers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEngineers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEngineers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
