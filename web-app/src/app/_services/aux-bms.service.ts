import { Injectable, EventEmitter } from '@angular/core';

import { AuxBms, State } from '../_objects/aux-bms';
import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
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

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateAuxBms(data);
        this.auxbms$.emit(this.getData());
      }
    );
  }

  getData(): AuxBms {
    return this.auxbms;
  }

  private updateAuxBms(data: INewTelemetryData): void {
    const pState = data.AuxBms.PrechargeState as keyof typeof State;
    this.auxbms.alive = data.AuxBms.AuxBmsAlive;
    this.auxbms.allowCharge = data.AuxBms.AllowCharge; // TODO: add the correct value
    this.auxbms.auxVoltage = data.AuxBms.AuxVoltage;
    this.auxbms.contactorError = data.AuxBms.CommonContactorError; // TODO: add the correct value
    this.auxbms.prechargeState = State[pState];
    this.auxbms.strobeBmsLight = data.AuxBms.StrobeBmsLight;
    this.auxbms.highVoltageEnable = data.AuxBms.HighVoltageEnableState; // TODO: add the correct value
  }
}
