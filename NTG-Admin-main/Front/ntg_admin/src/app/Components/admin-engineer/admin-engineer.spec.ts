import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEngineer } from './admin-engineer';

describe('AdminEngineer', () => {
  let component: AdminEngineer;
  let fixture: ComponentFixture<AdminEngineer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEngineer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEngineer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
