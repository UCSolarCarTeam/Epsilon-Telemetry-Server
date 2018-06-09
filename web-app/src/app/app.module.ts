import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { BatteryComponent } from './tabs/battery/battery.component';
import { ControlsComponent } from './tabs/controls/controls.component';
import { MotorComponent } from './tabs/motor/motor.component';
import { MpptComponent } from './tabs/mppt/mppt.component';
import { FaultsComponent } from './tabs/faults/faults.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BatteryComponent,
    ControlsComponent,
    MotorComponent,
    MpptComponent,
    FaultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
