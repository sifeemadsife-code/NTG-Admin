import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDetails } from './engineer-details';

describe('EngineerDetails', () => {
  let component: EngineerDetails;
  let fixture: ComponentFixture<EngineerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
