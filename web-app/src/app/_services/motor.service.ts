import { Injectable, EventEmitter } from '@angular/core';

import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
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

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
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

  private updateMotor(data: INewTelemetryData, num: number): void {
    this[`motor${num}`].alive = data.KeyMotor[num].Alive;
    this[`motor${num}`].backEmfReal = this.rService.getRoundedValue(data.MotorDetails[num].BackEmf, 2);
    this[`motor${num}`].backEmfImaginary = this.rService.getRoundedValue(data.MotorDetails[num].BackEmf, 2);
    this[`motor${num}`].busCurrent = this.rService.getRoundedValue(data.KeyMotor[num].BusCurrent, 2);
    this[`motor${num}`].busVoltage = this.rService.getRoundedValue(data.KeyMotor[num].BusVoltage, 2);
    this[`motor${num}`].dcBusAmpHours = this.rService.getRoundedValue(data.MotorDetails[num].DcBusAmpHours, 2);
    this[`motor${num}`].dspBoardTemp = this.rService.getRoundedValue(data.MotorDetails[num].DspBoardTemp, 2);
    this[`motor${num}`].heatSinkTemp = this.rService.getRoundedValue(data.MotorDetails[num].HeatSinkTemp, 2);
    this[`motor${num}`].motorCurrentImaginary = this.rService.getRoundedValue(data.MotorDetails[num].MotorCurrentImaginary, 2);
    this[`motor${num}`].motorCurrentReal = this.rService.getRoundedValue(data.MotorDetails[num].MotorCurrentReal, 2);
    this[`motor${num}`].motorTemp = this.rService.getRoundedValue(data.MotorDetails[num].MotorTemp, 2);
    this[`motor${num}`].motorVoltageImaginary = this.rService.getRoundedValue(data.MotorDetails[num].MotorVoltageImaginary, 2);
    this[`motor${num}`].motorVoltageReal = this.rService.getRoundedValue(data.MotorDetails[num].MotorVoltageReal, 2);
    this[`motor${num}`].odometer = this.rService.getRoundedValue(data.MotorDetails[num].Odometer, 2);
    this[`motor${num}`].phaseBCurrent = this.rService.getRoundedValue(data.MotorDetails[num].PhaseBCurrent, 2);
    this[`motor${num}`].phaseCCurrent = this.rService.getRoundedValue(data.MotorDetails[num].PhaseCCurrent, 2);
    this[`motor${num}`].setCurrent = this.rService.getRoundedValue(data.KeyMotor[num].SetCurrent, 2);
    this[`motor${num}`].setVelocity = this.rService.getRoundedValue(data.KeyMotor[num].SetVelocity, 2);
    this[`motor${num}`].slipSpeed = this.rService.getRoundedValue(data.MotorDetails[num].SlipSpeed, 2);
    this[`motor${num}`].vehicleVelocity = this.rService.getRoundedValue(data.KeyMotor[num].VehicleVelocity, 2);
    this[`motor${num}`].voltageRail15VSupply = this.rService.getRoundedValue(data.MotorDetails[num].VoltageRail15VSupply, 2);
    this[`motor${num}`].voltageRail1VSupply = this.rService.getRoundedValue(data.MotorDetails[num].VoltageRail1VSupply, 2);
    this[`motor${num}`].voltageRail3VSupply = this.rService.getRoundedValue(data.MotorDetails[num].VoltageRail3VSupply, 2);
  }
}
