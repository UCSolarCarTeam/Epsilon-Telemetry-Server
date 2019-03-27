import { Component, OnInit } from '@angular/core';

import { AuxBms } from '../../_objects/aux-bms';
import { AuxBmsService } from '../../_services/aux-bms.service';
import { Battery } from '../../_objects/battery';
import { BatteryService } from '../../_services/battery.service';


@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})

export class BatteryComponent implements OnInit {

  auxBms: AuxBms;
  battery: Battery;

  constructor(private auxBmsService: AuxBmsService,
              private batteryService: BatteryService) { }

  ngOnInit() {
    this.battery = this.batteryService.getData();
    this.auxBms = this.auxBmsService.getData();

    this.auxBmsService.auxbms$.subscribe(
      (data: AuxBms) => {
        this.auxBms = data;
      }
    );
    this.batteryService.battery$.subscribe(
      (data: Battery) => {
        this.battery = data;
      }
    );
  }
  getLowCellVoltage(): number {
  return this.battery.lowCellVoltage/1000;
  }
  getHighCellVoltage(): number {
  return this.battery.highCellVoltage/1000;
  }
}
