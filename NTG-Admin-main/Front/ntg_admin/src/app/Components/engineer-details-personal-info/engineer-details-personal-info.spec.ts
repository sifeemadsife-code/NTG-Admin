import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDetailsPersonalInfo } from './engineer-details-personal-info';

describe('EngineerDetailsPersonalInfo', () => {
  let component: EngineerDetailsPersonalInfo;
  let fixture: ComponentFixture<EngineerDetailsPersonalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerDetailsPersonalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerDetailsPersonalInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
