import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BatteryComponent } from './tabs/battery/battery.component';
import { ControlsComponent } from './tabs/controls/controls.component';
import { FaultsComponent } from './tabs/faults/faults.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { MotorComponent } from './tabs/motor/motor.component';
import { MpptComponent } from './tabs/mppt/mppt.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';

import { WebSocketService } from './websocket.service';
import { DataInitService } from './_services/data.init.service';
import { APP_INITIALIZER } from '@angular/core';
import { TimestampComponent } from './timestamp/timestamp.component';

@NgModule({
  declarations: [
    AppComponent,
    BatteryComponent,
    ControlsComponent,
    FaultsComponent,
    LeftpanelComponent,
    MotorComponent,
    MpptComponent,
    RightpanelComponent,
    TimestampComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    AppRoutingModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [
    WebSocketService,
    DataInitService,
    { provide: APP_INITIALIZER,
      useFactory: (fs: DataInitService) => function() {return fs.load()},
      deps: [DataInitService],
      multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
