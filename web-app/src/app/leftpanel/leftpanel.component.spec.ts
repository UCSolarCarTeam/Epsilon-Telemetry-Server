import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftpanelComponent } from './leftpanel.component';

describe('LeftpanelComponent', () => {
  let component: LeftpanelComponent;
  let fixture: ComponentFixture<LeftpanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftpanelComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LeftpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
