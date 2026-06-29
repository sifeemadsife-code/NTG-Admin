import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEngineer } from './add-engineer';

describe('AddEngineer', () => {
  let component: AddEngineer;
  let fixture: ComponentFixture<AddEngineer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEngineer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEngineer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
