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
    this.auxbms.allowDischarge = data.AuxBms.AllowDischarge;
    this.auxbms.chargeContactorError = data.AuxBms.ChargeContactorError;
    this.auxbms.chargeOpenButShouldBeClosed = data.AuxBms.ChargeOpenButShouldBeClosed;
    this.auxbms.chargeShouldTrip = data.AuxBms.ChargeShouldTrip;
    this.auxbms.chargeTripDueToHighCellVoltage = data.AuxBms.ChargeTripDueToHighCellVoltage;
    this.auxbms.chargeTripDueToHighTemperatureAndCurrent = data.AuxBms.ChargeTripDueToHighTemperatureAndCurrent;
    this.auxbms.chargeTripDueToPackCurrent = data.AuxBms.ChargeTripDueToPackCurrent;
    this.auxbms.dischargeContactorError = data.AuxBms.DischargeContactorError;
    this.auxbms.dischargeOpenButShouldBeClosed = data.AuxBms.DischargeOpenButShouldBeClosed;
    this.auxbms.dischargeShouldTrip = data.AuxBms.DischargeShouldTrip;
    this.auxbms.dischargeTripDueToHighTemperatureAndCurrent = data.AuxBms.DischargeTripDueToHighTemperatureAndCurrent;
    this.auxbms.dischargeTripDueToLowCellVoltage = data.AuxBms.DischargeTripDueToLowCellVoltage;
    this.auxbms.dischargeTripDueToPackCurrent = data.AuxBms.DischargeTripDueToPackCurrent;
    this.auxbms.orionCANReceivedRecently = data.AuxBms.OrionCANReceivedRecently;
    this.auxbms.protectionTrip = data.AuxBms.ProtectionTrip;
    this.auxbms.tripDueToOrionMessageTimeout = data.AuxBms.TripDueToOrionMessageTimeout;
    this.auxbms.chargeNotClosedDueToHighCurrent = data.AuxBms.ChargeNotClosedDueToHighCurrent;
    this.auxbms.dischargeNotClosedDueToHighCurrent = data.AuxBms.DischargeNotClosedDueToHighCurrent;
  }
}
