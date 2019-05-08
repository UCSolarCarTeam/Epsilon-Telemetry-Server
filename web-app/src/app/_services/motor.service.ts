import { Injectable, EventEmitter } from '@angular/core';

import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
import { Motor } from '../_objects/motor';
import { WebSocketService } from '../websocket.service';
import { RoundingService } from './rounding.service';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  motor0$: EventEmitter<Motor>;
  motor1$: EventEmitter<Motor>;

  private motor0: Motor;
  private motor1: Motor;

  constructor(private wsService: WebSocketService, private rService: RoundingService) {
    this.motor0$ = new EventEmitter<Motor>();
    this.motor1$ = new EventEmitter<Motor>();

    this.motor0 = new Motor;
    this.motor1 = new Motor;

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.updateMotor(data, 0);
        this.updateMotor(data, 1);

        this.motor0$.emit(this.getData(0));
        this.motor1$.emit(this.getData(1));
      }
    );
  }

  getData(num: number): Motor {
    return this[`motor${num}`];
  }

  private updateMotor(data: ITelemetryData, num: number): void {
    this[`motor${num}`].alive = data[`motor${num}alive`];
    this[`motor${num}`].backEmf = this.rService.getRoundedValue(data[`motor${num}backemf`], 2);
    this[`motor${num}`].busCurrent = this.rService.getRoundedValue(data[`motor${num}buscurrent`], 2);
    this[`motor${num}`].busVoltage = this.rService.getRoundedValue(data[`motor${num}busvoltage`], 2);
    this[`motor${num}`].dcBusAmpHours = this.rService.getRoundedValue(data[`motor${num}dcbusamphours`], 2);
    this[`motor${num}`].dspBoardTemp = this.rService.getRoundedValue(data[`motor${num}dspboardtemp`], 2);
    this[`motor${num}`].heatSinkTemp = this.rService.getRoundedValue(data[`motor${num}heatsinktemp`], 2);
    this[`motor${num}`].motorCurrentImaginary = this.rService.getRoundedValue(data[`motor${num}motorcurrentimaginary`], 2);
    this[`motor${num}`].motorCurrentReal = this.rService.getRoundedValue(data[`motor${num}motorcurrentreal`], 2);
    this[`motor${num}`].motorTemp = this.rService.getRoundedValue(data[`motor${num}motortemp`], 2);
    this[`motor${num}`].motorVoltageImaginary = this.rService.getRoundedValue(data[`motor${num}motorvoltageimaginary`], 2);
    this[`motor${num}`].motorVoltageReal = this.rService.getRoundedValue(data[`motor${num}motorvoltagereal`], 2);
    this[`motor${num}`].odometer = this.rService.getRoundedValue(data[`motor${num}odometer`], 2);
    this[`motor${num}`].phaseBCurrent = this.rService.getRoundedValue(data[`motor${num}phasebcurrent`], 2);
    this[`motor${num}`].phaseCCurrent = this.rService.getRoundedValue(data[`motor${num}phaseccurrent`], 2);
    this[`motor${num}`].setCurrent = this.rService.getRoundedValue(data[`motor${num}setcurrent`], 2);
    this[`motor${num}`].setVelocity = this.rService.getRoundedValue(data[`motor${num}setvelocity`], 2);
    this[`motor${num}`].slipSpeed = this.rService.getRoundedValue(data[`motor${num}slipspeed`], 2);
    this[`motor${num}`].vehicleVelocity = this.rService.getRoundedValue(data[`motor${num}vehiclevelocity`], 2);
    this[`motor${num}`].voltageRail15VSupply = this.rService.getRoundedValue(data[`motor${num}voltagerail15vsupply`], 2);
    this[`motor${num}`].voltageRail1VSupply = this.rService.getRoundedValue(data[`motor${num}voltagerail1vsupply`], 2);
    this[`motor${num}`].voltageRail3VSupply = this.rService.getRoundedValue(data[`motor${num}voltagerail3vsupply`], 2);
  }
}
