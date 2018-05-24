import { Injectable, EventEmitter } from '@angular/core';
import { Motor } from '../_objects/motor';
import { WebSocketService } from '../websocket.service';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  motor0$: EventEmitter<Motor>;
  motor1$: EventEmitter<Motor>;

  private motor0: Motor;
  private motor1: Motor;

  constructor(private wsService: WebSocketService) {
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
    this[`motor${num}`].busCurrent = data[`motor${num}buscurrent`];
    this[`motor${num}`].busVoltage = data[`motor${num}busvoltage`];
    this[`motor${num}`].setCurrent = data[`motor${num}setcurrent`];
    this[`motor${num}`].setVelocity = data[`motor${num}setvelocity`];
    this[`motor${num}`].vehicleVelocity = data[`motor${num}vehiclevelocity`];
    this[`motor${num}`].backEmf = data[`motor${num}backemf`];
    this[`motor${num}`].dcBusAmpHours = data[`motor${num}dcbusamphours`];
    this[`motor${num}`].dspBoardTemp = data[`motor${num}dspboardtemp`];
    this[`motor${num}`].heatSinkTemp = data[`motor${num}heatsinktemp`];
    this[`motor${num}`].motorCurrentImaginary = data[`motor${num}motorcurrentimaginary`];
    this[`motor${num}`].motorCurrentReal = data[`motor${num}motorcurrentreal`];
    this[`motor${num}`].motorTemp = data[`motor${num}motortemp`];
    this[`motor${num}`].motorVoltageImaginary = data[`motor${num}motorvoltageimaginary`];
    this[`motor${num}`].motorVoltageReal = data[`motor${num}motorvoltagereal`];
    this[`motor${num}`].odometer = data[`motor${num}odometer`];
    this[`motor${num}`].phaseBCurrent = data[`motor${num}phasebcurrent`];
    this[`motor${num}`].phaseCCurrent = data[`motor${num}phaseccurrent`];
    this[`motor${num}`].slipSpeed = data[`motor${num}slipspeed`];
    this[`motor${num}`].voltageRail15VSupply = data[`motor${num}voltagerail15vsupply`];
    this[`motor${num}`].voltageRail1VSupply = data[`motor${num}voltagerail1vsupply`];
    this[`motor${num}`].voltageRail3VSupply = data[`motor${num}voltagerail3vsupply`];
  }
}
