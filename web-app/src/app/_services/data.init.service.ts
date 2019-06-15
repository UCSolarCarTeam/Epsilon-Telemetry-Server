import { Injectable } from '@angular/core';

import { FaultsService } from './faults.service';
import { AuxBmsService } from './aux-bms.service';
import { BatteryService } from './battery.service';
import { ControlsService } from './controls.service';
import { LightsService } from './lights.service';
import { MotorService } from './motor.service';
import { MpptService } from './mppt.service';
import { LapService } from './lap.service'

@Injectable({
  providedIn: 'root'
})
export class DataInitService {

  constructor(private fs: FaultsService,
              private abs: AuxBmsService,
              private bs: BatteryService,
              private cs: ControlsService,
              private ls: LightsService,
              private mots: MotorService,
              private mps: MpptService,
              private laps: LapService,
              ) {}

  load() {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}

export function DataProviderFactory(provider: DataInitService) {
  return provider.load();
}
