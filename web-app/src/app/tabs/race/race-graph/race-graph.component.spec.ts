import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceGraphComponent } from './race-graph.component';

describe('RaceGraphComponent', () => {
  let component: RaceGraphComponent;
  let fixture: ComponentFixture<RaceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
