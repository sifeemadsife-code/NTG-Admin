import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sendemail } from './sendemail';

describe('Sendemail', () => {
  let component: Sendemail;
  let fixture: ComponentFixture<Sendemail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sendemail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sendemail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
