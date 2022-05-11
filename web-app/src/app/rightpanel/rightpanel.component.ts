import { Component, OnInit } from '@angular/core';

import { AuxBms, State } from '../_objects/aux-bms';
import { AuxBmsService } from '../_services/aux-bms.service';
import { Battery } from '../_objects/battery';
import { BatteryService } from '../_services/battery.service';
import { Controls } from '../_objects/controls';
import { ControlsService } from '../_services/controls.service';
import { Lights } from '../_objects/lights';
import { LightsService } from '../_services/lights.service';
import { Motor } from '../_objects/motor';
import { MotorService } from '../_services/motor.service';
import { Mppt } from '../_objects/mppt';
import { MpptService } from '../_services/mppt.service';

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
  mppt0: Mppt;
  mppt1: Mppt;
  mppt2: Mppt;
  mppt3: Mppt;
  state = State;

  constructor(private auxBmsService: AuxBmsService,
              private batteryService: BatteryService,
              private controlsService: ControlsService,
              private lightsService: LightsService,
              private motorService: MotorService,
              private mpptService: MpptService) { }

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
    this.mppt3 = this.mpptService.getData(3);

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
      (data: Mppt) => {
        this.mppt0 = data;
      }
    );

    this.mpptService.mppt1$.subscribe(
      (data: Mppt) => {
        this.mppt1 = data;
      }
    );

    this.mpptService.mppt2$.subscribe(
      (data: Mppt) => {
        this.mppt2 = data;
      }
    );

    this.mpptService.mppt3$.subscribe(
      (data: Mppt) => {
        this.mppt3 = data;
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

  getVehicleVelocityPercentage(): number {
    const maxSpeed = 110;
    return this.getVehicleVelocity() / maxSpeed * 100;
  }

  getTotalPackCapacityKWh(): number {
    return this.battery.totalPackCapacity * this.battery.packVoltage / 1000;
  }

  getPackKWh(): number {
    return this.battery.packAmphours * this.battery.packVoltage / 1000;
  }

  getTotalArrayPower(): number {
    const mppt0ArrayPower: number = this.mppt0.arrayCurrent * this.mppt0.arrayVoltage;
    const mppt1ArrayPower: number = this.mppt1.arrayCurrent * this.mppt1.arrayVoltage;
    const mppt2ArrayPower: number = this.mppt2.arrayCurrent * this.mppt2.arrayVoltage;
    const mppt3ArrayPower: number = this.mppt3.arrayCurrent * this.mppt3.arrayVoltage;
    return mppt0ArrayPower + mppt1ArrayPower + mppt2ArrayPower + mppt3ArrayPower;
  }
  getBatteryPower(): number {
    return this.battery.packVoltage * this.battery.packCurrent;
  }
}