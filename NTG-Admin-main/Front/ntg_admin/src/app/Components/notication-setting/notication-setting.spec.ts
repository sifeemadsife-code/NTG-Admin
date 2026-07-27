import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticationSetting } from './notication-setting';

describe('NoticationSetting', () => {
  let component: NoticationSetting;
  let fixture: ComponentFixture<NoticationSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticationSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticationSetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
