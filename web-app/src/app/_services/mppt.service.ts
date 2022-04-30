import { Injectable, EventEmitter } from '@angular/core';

import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
import { Mppt } from '../_objects/mppt';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MpptService {

  mppt0$: EventEmitter<Mppt>;
  mppt1$: EventEmitter<Mppt>;
  mppt2$: EventEmitter<Mppt>;
  mppt3$: EventEmitter<Mppt>;

  private mppt0: Mppt;
  private mppt1: Mppt;
  private mppt2: Mppt;
  private mppt3: Mppt;

  constructor(private wsService: WebSocketService) {
    this.mppt0$ = new EventEmitter<Mppt>();
    this.mppt1$ = new EventEmitter<Mppt>();
    this.mppt2$ = new EventEmitter<Mppt>();
    this.mppt3$ = new EventEmitter<Mppt>();

    this.mppt0 = new Mppt;
    this.mppt1 = new Mppt;
    this.mppt2 = new Mppt;
    this.mppt3 = new Mppt;

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateMppt(data, 0);
        this.updateMppt(data, 1);
        this.updateMppt(data, 2);
        this.updateMppt(data, 3);

        this.mppt0$.emit(this.getData(0));
        this.mppt1$.emit(this.getData(1));
        this.mppt2$.emit(this.getData(2));
        this.mppt3$.emit(this.getData(3));
      }
    );
  }

  getData(num: number): Mppt {
    return this[`mppt${num}`];
  }

  private updateMppt(data: INewTelemetryData, num: number): void {
    this[`mppt${num}`].alive = data.MPPT[num].Alive;
    this[`mppt${num}`].arrayCurrent = data.MPPT[num].ArrayCurrent;
    this[`mppt${num}`].arrayVoltage = data.MPPT[num].ArrayVoltage;
    this[`mppt${num}`].batteryVoltage = data.MPPT[num].BatteryVoltage;
    this[`mppt${num}`].temperature = data.MPPT[num].Temperature;
  }
}
