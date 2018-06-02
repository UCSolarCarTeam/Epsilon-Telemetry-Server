import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc, State } from '../battery-misc';

import { AuxBms } from '../_objects/aux-bms';
import { AuxBmsService } from '../_services/aux-bms.service';
import { Battery } from '../_objects/battery';
import { BatteryService } from '../_services/battery.service';
import { Controls } from '../_objects/controls';
import { ControlsService } from '../_services/controls.service';
import { Lights } from '../_objects/lights';
import { LightsService } from '../_services/lights.service';
import { Motor } from '../_objects/motor';
import { MotorService } from '../_services/motor.service';
import { MPPT } from '../_objects/mppt';
import { MPPTService } from '../_services/mppt.service';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  auxBms: AuxBms;
  battery: Battery;
  controls: Controls;
  lights: Lights;
  motor0: Motor;
  motor1: Motor;
  mppt0: MPPT;
  mppt1: MPPT;
  mppt2: MPPT;

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

  constructor(private auxBmsService: AuxBmsService,
              private batteryService: BatteryService,
              private controlsService: ControlsService,
              private lightsService: LightsService,
              private motorService: MotorService,
              private mpptService: MPPTService) { }

  ngOnInit() {
    this.auxBms = this.auxBmsService.getData();
    this.battery = this.batteryService.getData();
    this.controls = this.controlsService.getData();
    this.lights = this.lightsService.getData();
    this.motor0 = this.motorService.getData(0);
    this.motor1 = this.motorService.getData(1);
    this.mppt0 = this.mpptService.getData(0);
    this.mppt1 = this.mpptService.getData(1);
    this.mppt2 = this.mpptService.getData(2);

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

    this.mpptService.mppt0$.subscribe(
      (data: MPPT) => {
        this.mppt0 = data;
      }
    );

    this.mpptService.mppt1$.subscribe(
      (data: MPPT) => {
        this.mppt1 = data;
      }
    );

    this.mpptService.mppt2$.subscribe(
      (data: MPPT) => {
        this.mppt2 = data;
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
    return this.getSetVelocity() / velocityTotal * 100; }

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

  getTotalArrayPower(): number {
    let mppt0ArrayPower: number = this.mppt0.arrayCurrent * this.mppt0.arrayVoltage;
    let mppt1ArrayPower: number = this.mppt1.arrayCurrent * this.mppt1.arrayVoltage;
    let mppt2ArrayPower: number = this.mppt2.arrayCurrent * this.mppt2.arrayVoltage;
    return mppt0ArrayPower + mppt1ArrayPower + mppt2ArrayPower;
  }
}
