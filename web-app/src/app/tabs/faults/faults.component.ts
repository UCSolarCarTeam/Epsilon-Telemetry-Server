import { Component, OnInit } from '@angular/core';

import { AuxBms } from '../../_objects/aux-bms';
import { BatteryFaults } from '../../_objects/faults/battery-faults';
import { MotorFaults } from '../../_objects/faults/motor-faults';
import { FaultsService } from '../../_services/faults.service';
import { AuxBmsService } from '../../_services/aux-bms.service';

@Component({
  selector: 'app-faults',
  templateUrl: './faults.component.html',
  styleUrls: ['./faults.component.css']
})
export class FaultsComponent implements OnInit {

  batteryFaults: BatteryFaults;
  motor0Faults: MotorFaults;
  motor1Faults: MotorFaults;
  auxBms: AuxBms;

  constructor(private faultsService: FaultsService, private auxBmsService: AuxBmsService) { }

  ngOnInit() {
    this.batteryFaults = this.faultsService.getBatteryFaults();
    this.motor0Faults = this.faultsService.getMotorFaults(0);
    this.motor1Faults = this.faultsService.getMotorFaults(1);
    this.auxBms = this.auxBmsService.getData();

    this.faultsService.batteryFaults$.subscribe(
      (data: BatteryFaults) => {
        this.batteryFaults = data;
      }
    );

    this.auxBmsService.auxbms$.subscribe(
      (data: AuxBms) => {
        this.auxBms = data;
      }
    );

    this.faultsService.motor0Faults$.subscribe(
      (data: MotorFaults) => {
        this.motor0Faults = data;
      }
    );

    this.faultsService.motor1Faults$.subscribe(
      (data: MotorFaults) => {
        this.motor1Faults = data;
      }
    );

  }

}
