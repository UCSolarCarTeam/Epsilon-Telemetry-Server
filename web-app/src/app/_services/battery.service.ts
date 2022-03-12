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
    this.battery.alive = data.battery.alive;
    this.battery.averageCellVoltage = data.battery.averageCellVoltage;
    this.battery.averageTemperature = data.battery.averageTemperature;
    this.battery.bmsRelayStatusFlags.alwaysOnSignalStatus = data.battery.BMSRelayStatusFlags.alwaysOnSignalStatus;
    this.battery.bmsRelayStatusFlags.chargeRelayEnabled = data.battery.BMSRelayStatusFlags.chargeRelayEnabled;
    this.battery.bmsRelayStatusFlags.chargerSafetyEnabled = data.battery.BMSRelayStatusFlags.chargerSafetyEnabled;
    this.battery.bmsRelayStatusFlags.dischargeRelayEnabled = data.battery.BMSRelayStatusFlags.dischargeRelayEnabled;
    this.battery.bmsRelayStatusFlags.isChargingSignalStatus = data.battery.BMSRelayStatusFlags.isChargingSignalStatus;
    this.battery.bmsRelayStatusFlags.isReadySignalStatus = data.battery.BMSRelayStatusFlags.isReadySignalStatus;
    this.battery.bmsRelayStatusFlags.malfunctionIndicatorActive = data.battery.BMSRelayStatusFlags.malfunctionIndicatorActive;
    this.battery.bmsRelayStatusFlags.multiPurposeInputSignalStatus = data.battery.BMSRelayStatusFlags.multiPurposeInputSignalStatus;
    this.battery.fanSpeed = data.battery.fanSpeed;
    this.battery.fanVoltage = this.rService.getRoundedValue(data.battery.fanVoltage, 2);
    this.battery.highCellVoltage = data.battery.highCellVoltage;
    this.battery.highCellVoltageId = data.battery.highCellVoltageID;
    this.battery.highTemperature = data.battery.highTemperature;
    this.battery.highThermistorId = data.battery.highThermistorID;
    this.battery.internalTemperature = data.battery.internalTemperature;
    this.battery.lowCellVoltage = data.battery.lowCellVoltage;
    this.battery.lowCellVoltageId = data.battery.lowCellVoltageID;
    this.battery.lowTemperature = data.battery.lowTemperature;
    this.battery.lowThermistorId = data.battery.lowTermistorID;
    this.battery.packAmphours = this.rService.getRoundedValue(data.battery.packAmphours, 2);
    this.battery.packCurrent = this.rService.getRoundedValue(data.battery.packCurrent, 2);
    this.battery.packDepthOfDischarge = this.rService.getRoundedValue(data.battery.packDepthofDischarge, 2);
    this.battery.packStateOfCharge = this.rService.getRoundedValue(data.battery.packStateofCharge, 2);
    this.battery.packVoltage = this.rService.getRoundedValue(data.battery.packVoltage, 2);
    this.battery.populatedCells = data.battery.populatedCells;
    this.battery.requestedFanSpeed = data.battery.requestedFanSpeed;
    this.battery.totalPackCapacity = 168;
    this.battery.twelvevinputVoltage = this.rService.getRoundedValue(data.battery.inputVoltage12V, 2);
    this.battery.averageCellVoltage = data.battery.averageCellVoltage / 1000;
    this.battery.lowCellVoltage = data.battery.lowCellVoltage / 1000;
    this.battery.highCellVoltage = data.battery.highCellVoltage / 1000;
  }
}
