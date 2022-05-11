import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LeftpanelComponent } from './leftpanel.component';

describe('LeftpanelComponent', () => {
  let component: LeftpanelComponent;
  let fixture: ComponentFixture<LeftpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftpanelComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
