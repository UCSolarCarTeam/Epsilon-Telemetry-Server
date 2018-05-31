import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc, State } from '../battery-misc';

import { Battery } from '../_objects/battery';
import { BatteryService } from '../_services/battery.service';
import { AuxBms } from '../_objects/aux-bms';
import { AuxBmsService } from '../_services/aux-bms.service';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  battery: Battery;
  auxBms: AuxBms;

  carMisc = new CarMisc(false, true, false, true,
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

  constructor(private batteryService: BatteryService,
              private auxBmsService: AuxBmsService) { }

  ngOnInit() {
    this.battery = this.batteryService.getData();
    this.auxBms = this.auxBmsService.getData();

    this.batteryService.battery$.subscribe(
      (data: Battery) => {
        this.battery = data;
      }
    );

    this.auxBmsService.auxbms$.subscribe(
      (data: AuxBms) => {
        this.auxBms = data;
      }
    );
  }
}
