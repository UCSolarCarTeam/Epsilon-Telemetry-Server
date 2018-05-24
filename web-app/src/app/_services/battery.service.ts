import { Injectable, EventEmitter } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { Battery } from '../_objects/battery';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  battery$: EventEmitter<Battery>;
  
  private battery: Battery;

  constructor(private wsService: WebSocketService) {
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
    this.battery.twelvevinputVoltage = data.twelvevinputvoltage;
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
    this.battery.fanVoltage = data.fanvoltage;
    this.battery.highCellVoltage = data.highcellvoltage;
    this.battery.highCellVoltageId = data.highcellvoltageid;
    this.battery.highTemperature = data.hightemperature;
    this.battery.highThermistorId = data.highthermistorid;
    this.battery.internalTemperature = data.internaltemperature;
    this.battery.lowCellVoltage = data.lowcellvoltage;
    this.battery.lowCellVoltageId = data.lowcellvoltageid;
    this.battery.lowTemperature = data.lowtemperature;
    this.battery.lowThermistorId = data.lowthermistorid;
    this.battery.packAmphours = data.packamphours;
    this.battery.packCurrent = data.packcurrent;
    this.battery.packDepthOfDischarge = data.packdepthofdischarge;
    this.battery.packStateOfCharge = data.packstateofcharge;
    this.battery.packVoltage = data.packvoltage;
    this.battery.populatedCells = data.populatedcells;
    this.battery.requestedFanSpeed = data.requestedfanspeed;
  }
}
