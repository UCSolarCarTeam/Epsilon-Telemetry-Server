import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BatteryComponent } from './tabs/battery/battery.component';
import { ControlsComponent } from './tabs/controls/controls.component';
import { FaultsComponent } from './tabs/faults/faults.component';
import { MotorComponent } from './tabs/motor/motor.component';
import { MpptComponent } from './tabs/mppt/mppt.component';
import { RaceComponent } from './tabs/race/race.component';

const routes: Routes = [
    { path: 'battery', component: BatteryComponent },
    { path: 'controls', component: ControlsComponent },
    { path: 'motor', component: MotorComponent },
    { path: 'mppt', component: MpptComponent },
    { path: 'faults', component: FaultsComponent },
    { path: 'race', component: RaceComponent },
    { path: '**', redirectTo: '/battery', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
