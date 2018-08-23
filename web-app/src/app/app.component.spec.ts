import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { AppRoutingModule } from './app-routing.module';
import { BatteryComponent } from './tabs/battery/battery.component';
import { ControlsComponent } from './tabs/controls/controls.component';
import { FaultsComponent } from './tabs/faults/faults.component';
import { MotorComponent } from './tabs/motor/motor.component';
import { MpptComponent } from './tabs/mppt/mppt.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        AppRoutingModule
      ],
      declarations: [
        AppComponent,
        LeftpanelComponent,
        RightpanelComponent,
        BatteryComponent,
        ControlsComponent,
        FaultsComponent,
        MotorComponent,
        MpptComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
