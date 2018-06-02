import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc, State } from '../battery-misc';

import { Battery } from '../_objects/battery';
import { BatteryService } from '../_services/battery.service';
import { AuxBms } from '../_objects/aux-bms';
import { AuxBmsService } from '../_services/aux-bms.service';
import { Controls } from '../_objects/controls';
import { ControlsService } from '../_services/controls.service';
import { Lights } from '../_objects/lights';
import { LightsService } from '../_services/lights.service';
import { Motor } from '../_objects/motor';
import { MotorService } from '../_services/motor.service';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  battery: Battery;
  auxBms: AuxBms;
  lights: Lights;
  controls: Controls;
  motor0: Motor;
  motor1: Motor;

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
    packVoltage: 50, prechargeState: State.COMMON_ENGAGED
  };

  constructor(private batteryService: BatteryService,
              private auxBmsService: AuxBmsService,
              private controlsService: ControlsService,
              private motorService: MotorService,
              private lightsService: LightsService) { }

  ngOnInit() {
    this.battery = this.batteryService.getData();
    this.auxBms = this.auxBmsService.getData();
    this.controls = this.controlsService.getData();
    this.motor0 = this.motorService.getData(0);
    this.motor1 = this.motorService.getData(1);
    this.lights = this.lightsService.getData();

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

    this.controlsService.controls$.subscribe(
      (data: Controls) => {
        this.controls = data;
      }
    );

    this.lightsService.lights$.subscribe(
      (data: Lights) => {
        this.lights = data;
      }
    );

    this.motorService.motor0$.subscribe(
      (data: Motor) => {
        this.motor0 = data;
      }
    );

    this.motorService.motor1$.subscribe(
      (data: Motor) => {
        this.motor1 = data;
      }
    );
  }

  getAvgSetCurrent(): number {
    return (this.motor0.setCurrent + this.motor1.setCurrent) / 2;
  }

  getAvgBusCurrent(): number {
    return (this.motor0.busCurrent + this.motor1.busCurrent) / 2;
  }

  getAvgBusVoltage(): number {
    return (this.motor0.busVoltage + this.motor1.busVoltage) / 2;
  }

  getSetVelocity(): number {
    return (this.motor0.setVelocity + this.motor1.setVelocity) / 2;
  }

  getVehicleVelocity(): number {
    return (this.motor0.vehicleVelocity + this.motor1.vehicleVelocity) / 2;
  }


  getSetVelocityPercentage(): number {
    let velocityTotal: number = this.getVehicleVelocity() + this.getSetVelocity();
    return this.getSetVelocity() / velocityTotal * 100;
  }

  getVehicleVelocityPercentage(): number {
    let velocityTotal: number  = this.getVehicleVelocity() + this.getSetVelocity();
    return this.getVehicleVelocity() / velocityTotal * 100;
  }

  getTotalPackCapacityKWh(): number {
    return this.battery.totalPackCapacity * this.battery.packVoltage / 1000;
  }

  getPackKWh(): number {
    return this.battery.packAmphours * this.battery.packVoltage / 1000;
  }
}
