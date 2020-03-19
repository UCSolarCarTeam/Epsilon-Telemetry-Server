import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { TimestampComponent } from './timestamp.component';

describe('TimestampComponent', () => {
  let component: TimestampComponent;
  let fixture: ComponentFixture<TimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
