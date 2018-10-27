import { Injectable, EventEmitter } from '@angular/core';

import { AuxBms, State } from '../_objects/aux-bms';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuxBmsService {

  auxbms$: EventEmitter<AuxBms>;

  private auxbms: AuxBms;

  constructor(private wsService: WebSocketService) {
    this.auxbms$ = new EventEmitter<AuxBms>();
    this.auxbms = new AuxBms;

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.updateAuxBms(data);
        this.auxbms$.emit(this.getData());
      }
    );
  }

  getData(): AuxBms {
    return this.auxbms;
  }

  private updateAuxBms(data: ITelemetryData): void {
    const pState = data.prechargestate as keyof typeof State;
    this.auxbms.alive = data.auxbmsalive;
    this.auxbms.allowCharge = data.allowcharge;
    this.auxbms.auxVoltage = data.auxvoltage;
    this.auxbms.contactorError = data.contractorerror;
    this.auxbms.prechargeState = State[pState];
    this.auxbms.strobeBmsLight = data.strobebmslight;
    this.auxbms.highVoltageEnable = data.highvoltageenable;
  }
}
