import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc, State } from '../battery-misc';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  private carMisc = new CarMisc(false, true, false, true,
                                30, 40, 50, 20, 10, 140,
                                80, 65, true);

  batteryMisc: BatteryMisc = {
    totalPackCapacity: 40,
    packStateOfCharge: 60,
    packStateOfChargeHrs: 12,
    highestCellTemp: 15,
    lowestCellVoltage: 18,
    packCurrent: 10,
    packVoltage: 50,
    prechargeState: State.COMMON_ENGAGED
  };

  constructor() { }

  ngOnInit() {
  }
}
