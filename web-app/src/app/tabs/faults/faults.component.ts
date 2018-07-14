import { Component, OnInit } from '@angular/core';

import { BatteryFaults } from '../../_objects/faults/battery-faults';
import { MotorFaults } from '../../_objects/faults/motor-faults';
import { FaultsService } from '../../_services/faults.service';

@Component({
  selector: 'app-faults',
  templateUrl: './faults.component.html',
  styleUrls: ['./faults.component.css']
})
export class FaultsComponent implements OnInit {

  batteryFaults: BatteryFaults;
  motor0Faults: MotorFaults;
  motor1Faults: MotorFaults;

  constructor(private faultsService: FaultsService) { }

  ngOnInit() {
    this.batteryFaults = this.faultsService.getBatteryFaults();
    console.log(this.batteryFaults.errorFlags.internalCommunicationFault);
    this.motor0Faults = this.faultsService.getMotorFaults(0);
    this.motor1Faults = this.faultsService.getMotorFaults(1);

    this.faultsService.batteryFaults$.subscribe(
      (data: BatteryFaults) => {
        this.batteryFaults = data;
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
