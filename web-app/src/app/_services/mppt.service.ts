import { Injectable, EventEmitter } from '@angular/core';

import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
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
      (data: ITelemetryData) => {
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

  private updateMppt(data: ITelemetryData, num: number): void {
    this[`mppt${num}`].alive = data[`mppt${num}alive`];
    this[`mppt${num}`].arrayCurrent = data[`mppt${num}arraycurrent`];
    this[`mppt${num}`].arrayVoltage = data[`mppt${num}arrayvoltage`];
    this[`mppt${num}`].batteryVoltage = data[`mppt${num}batteryvoltage`];
    this[`mppt${num}`].temperature = data[`mppt${num}temperature`];
  }
}
