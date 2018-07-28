import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpptComponent } from './mppt.component';

describe('MpptComponent', () => {
  let component: MpptComponent;
  let fixture: ComponentFixture<MpptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MpptComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MpptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
