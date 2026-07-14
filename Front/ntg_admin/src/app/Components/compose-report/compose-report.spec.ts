import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeReport } from './compose-report';

describe('ComposeReport', () => {
  let component: ComposeReport;
  let fixture: ComponentFixture<ComposeReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposeReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
