import { Injectable, EventEmitter } from '@angular/core';
import { MPPT } from '../_objects/mppt';
import { WebSocketService } from '../websocket.service';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MPPTService {

  mppt0$: EventEmitter<MPPT>;
  mppt1$: EventEmitter<MPPT>;
  mppt2$: EventEmitter<MPPT>;

  private mppt0: MPPT;
  private mppt1: MPPT;
  private mppt2: MPPT;

  constructor(private wsService: WebSocketService) {
    this.mppt0$ = new EventEmitter<MPPT>();
    this.mppt1$ = new EventEmitter<MPPT>();
    this.mppt2$ = new EventEmitter<MPPT>();

    this.mppt0 = new MPPT;
    this.mppt1 = new MPPT;
    this.mppt2 = new MPPT;

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.updateMPPT(data, 0);
        this.updateMPPT(data, 1);
        this.updateMPPT(data, 2);

        this.mppt0$.emit(this.getData(0));
        this.mppt1$.emit(this.getData(1));
        this.mppt2$.emit(this.getData(2));
      }
    );
  }

  getData(num: number): MPPT {
    return this[`mppt${num}`];
  }

  private updateMPPT(data: ITelemetryData, num: number): void {
    this[`mppt${num}`].alive = data[`mppt${num}alive`];
    this[`mppt${num}`].arrayCurrent = data[`mppt${num}arrayvoltage`];
    this[`mppt${num}`].arrayVoltage = data[`mppt${num}arraycurrent`];
    this[`mppt${num}`].batteryVoltage = data[`mppt${num}batteryvoltage`];
    this[`mppt${num}`].temperature = data[`mppt${num}temperature`];
  }
}
