import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultsComponent } from './faults.component';

describe('FaultsComponent', () => {
  let component: FaultsComponent;
  let fixture: ComponentFixture<FaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
