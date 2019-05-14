import { Injectable, EventEmitter } from '@angular/core';

import { Battery } from '../_objects/battery';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
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

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.updateBattery(data);
        this.battery$.emit(this.getData());
      }
    );
  }

  getData(): Battery {
    return this.battery;
  }

  private updateBattery(data: ITelemetryData): void {
    this.battery.alive = data.batteryalive;
    this.battery.averageCellVoltage = data.averagecellvoltage;
    this.battery.averageTemperature = data.averagetemperature;
    this.battery.bmsRelayStatusFlags.alwaysOnSignalStatus = data.alwaysonsignalstatus;
    this.battery.bmsRelayStatusFlags.chargeRelayEnabled = data.chargerelayenabled;
    this.battery.bmsRelayStatusFlags.chargerSafetyEnabled = data.chargersafetyenabled;
    this.battery.bmsRelayStatusFlags.dischargeRelayEnabled = data.dischargerelayenabled;
    this.battery.bmsRelayStatusFlags.isChargingSignalStatus = data.ischargingsignalstatus;
    this.battery.bmsRelayStatusFlags.isReadySignalStatus = data.isreadysignalstatus;
    this.battery.bmsRelayStatusFlags.malfunctionIndicatorActive = data.malfunctionindicatoractive;
    this.battery.bmsRelayStatusFlags.multiPurposeInputSignalStatus = data.multipurposeinputsignalstatus;
    this.battery.fanSpeed = data.fanspeed;
    this.battery.fanVoltage = this.rService.getRoundedValue(data.fanvoltage, 2);
    this.battery.highCellVoltage = data.highcellvoltage;
    this.battery.highCellVoltageId = data.highcellvoltageid;
    this.battery.highTemperature = data.hightemperature;
    this.battery.highThermistorId = data.highthermistorid;
    this.battery.internalTemperature = data.internaltemperature;
    this.battery.lowCellVoltage = data.lowcellvoltage;
    this.battery.lowCellVoltageId = data.lowcellvoltageid;
    this.battery.lowTemperature = data.lowtemperature;
    this.battery.lowThermistorId = data.lowthermistorid;
    this.battery.packAmphours = this.rService.getRoundedValue(data.packamphours, 2);
    this.battery.packCurrent = this.rService.getRoundedValue(data.packcurrent, 2);
    this.battery.packDepthOfDischarge = this.rService.getRoundedValue(data.packdepthofdischarge, 2);
    this.battery.packStateOfCharge = this.rService.getRoundedValue(data.packstateofcharge, 2);
    this.battery.packVoltage = this.rService.getRoundedValue(data.packvoltage, 2);
    this.battery.populatedCells = data.populatedcells;
    this.battery.requestedFanSpeed = data.requestedfanspeed;
    this.battery.totalPackCapacity = 168;
    this.battery.twelvevinputVoltage = this.rService.getRoundedValue(data.twelvevinputvoltage, 2);
    this.battery.averageCellVoltage = data.averagecellvoltage / 1000;
    this.battery.lowCellVoltage = data.lowcellvoltage / 1000;
    this.battery.highCellVoltage = data.highcellvoltage / 1000;
  }
}
