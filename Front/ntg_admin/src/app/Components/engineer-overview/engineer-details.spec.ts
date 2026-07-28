import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDetailsOverView } from './engineer-details';

describe('EngineerDetails', () => {
  let component: EngineerDetailsOverView;
  let fixture: ComponentFixture<EngineerDetailsOverView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerDetailsOverView],
    }).compileComponents();

    fixture = TestBed.createComponent(EngineerDetailsOverView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
