import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngineerReport } from './create-engineer-report';

describe('CreateEngineerReport', () => {
  let component: CreateEngineerReport;
  let fixture: ComponentFixture<CreateEngineerReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEngineerReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEngineerReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
