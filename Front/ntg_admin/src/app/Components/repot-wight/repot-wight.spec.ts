import { WriteReportComponent } from './repot-wight';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('RepotWight', () => {
  let component: WriteReportComponent;
  let fixture: ComponentFixture<WriteReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WriteReportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
