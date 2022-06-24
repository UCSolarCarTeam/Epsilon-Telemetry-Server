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
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BatteryComponent } from './tabs/battery/battery.component';
import { ControlsComponent } from './tabs/controls/controls.component';
import { FaultsComponent } from './tabs/faults/faults.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { MotorComponent } from './tabs/motor/motor.component';
import { MpptComponent } from './tabs/mppt/mppt.component';
import { RaceComponent } from './tabs/race/race.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { DataTableComponent } from './tabs/race/data-table/data-table.component';

import { WebSocketService } from './websocket.service';
import { DataInitService } from './_services/data.init.service';
import { APP_INITIALIZER } from '@angular/core';
import { TimestampComponent } from './timestamp/timestamp.component';
import { RaceGraphComponent } from './tabs/race/race-graph/race-graph.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { PlaybackComponent } from './tabs/playback/playback.component';

@NgModule({
  declarations: [
    AppComponent,
    BatteryComponent,
    ControlsComponent,
    FaultsComponent,
    LeftpanelComponent,
    MotorComponent,
    MpptComponent,
    RaceComponent,
    RightpanelComponent,
    DataTableComponent,
    TimestampComponent,
    RaceGraphComponent,
    TestComponentComponent,
    PlaybackComponent
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
    MatTableModule,
    MatRadioModule,
    MatTooltipModule,
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
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
