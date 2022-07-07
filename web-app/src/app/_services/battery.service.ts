import { Injectable, EventEmitter } from '@angular/core';

import { Battery } from '../_objects/battery';
import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
import { WebSocketService } from '../websocket.service';
import { RoundingService } from './rounding.service';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  battery$: EventEmitter<Battery>;

  private battery: Battery;

  constructor(private wsService: WebSocketService, private rService: RoundingService) {
    this.battery$ = new EventEmitter<Battery>();
    this.battery = new Battery;

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateBattery(data);
        this.battery$.emit(this.getData());
      }
    );
  }

  getData(): Battery {
    return this.battery;
  }

  private updateBattery(data: INewTelemetryData): void {
    this.battery.alive = data.Battery.Alive;
    this.battery.averageCellVoltage = data.Battery.AverageCellVoltage;
    this.battery.averageTemperature = data.Battery.AverageTemperature;
    this.battery.bmsRelayStatusFlags.alwaysOnSignalStatus = data.Battery.BMSRelayStatusFlags.AlwaysOnSignalStatus;
    this.battery.bmsRelayStatusFlags.chargeRelayEnabled = data.Battery.BMSRelayStatusFlags.ChargeRelayEnabled;
    this.battery.bmsRelayStatusFlags.chargerSafetyEnabled = data.Battery.BMSRelayStatusFlags.ChargerSafetyEnabled;
    this.battery.bmsRelayStatusFlags.dischargeRelayEnabled = data.Battery.BMSRelayStatusFlags.DischargeRelayEnabled;
    this.battery.bmsRelayStatusFlags.isChargingSignalStatus = data.Battery.BMSRelayStatusFlags.IsChargingSignalStatus;
    this.battery.bmsRelayStatusFlags.isReadySignalStatus = data.Battery.BMSRelayStatusFlags.IsReadySignalStatus;
    this.battery.bmsRelayStatusFlags.malfunctionIndicatorActive = data.Battery.BMSRelayStatusFlags.MalfunctionIndicatorActive;
    this.battery.bmsRelayStatusFlags.multiPurposeInputSignalStatus = data.Battery.BMSRelayStatusFlags.MultiPurposeInputSignalStatus;
    this.battery.fanSpeed = data.Battery.FanSpeed;
    this.battery.fanVoltage = this.rService.getRoundedValue(data.Battery.FanVoltage, 2);
    this.battery.highCellVoltage = data.Battery.HighCellVoltage;
    this.battery.highCellVoltageId = data.Battery.HighCellVoltageId;
    this.battery.highTemperature = data.Battery.HighTemperature;
    this.battery.highThermistorId = data.Battery.HighThermistorId;
    this.battery.internalTemperature = data.Battery.InternalTemperature;
    this.battery.lowCellVoltage = data.Battery.LowCellVoltage;
    this.battery.lowCellVoltageId = data.Battery.LowCellVoltageId;
    this.battery.lowTemperature = data.Battery.LowTemperature;
    this.battery.lowThermistorId = data.Battery.LowThermistorId;
    this.battery.packAmphours = this.rService.getRoundedValue(data.Battery.PackAmphours, 2);
    this.battery.packCurrent = this.rService.getRoundedValue(data.Battery.PackCurrent, 2);
    this.battery.packDepthOfDischarge = this.rService.getRoundedValue(data.Battery.PackDepthOfDischarge, 2);
    this.battery.packStateOfCharge = this.rService.getRoundedValue(data.Battery.PackStateOfCharge, 2);
    this.battery.packVoltage = this.rService.getRoundedValue(data.Battery.PackVoltage, 2);
    this.battery.populatedCells = data.Battery.PopulatedCells;
    this.battery.requestedFanSpeed = data.Battery.RequestedFanSpeed;
    this.battery.totalPackCapacity = 168;
    this.battery.twelvevinputVoltage = this.rService.getRoundedValue(data.Battery['12vInputVoltage'], 2);
    this.battery.averageCellVoltage = data.Battery.AverageCellVoltage / 1000;
    this.battery.lowCellVoltage = data.Battery.LowCellVoltage / 1000;
    this.battery.highCellVoltage = data.Battery.HighCellVoltage / 1000;
  }
}
