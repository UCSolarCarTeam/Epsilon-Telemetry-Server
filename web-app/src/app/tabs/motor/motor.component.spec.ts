import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorComponent } from './motor.component';

describe('MotorComponent', () => {
  let component: MotorComponent;
  let fixture: ComponentFixture<MotorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotorComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
