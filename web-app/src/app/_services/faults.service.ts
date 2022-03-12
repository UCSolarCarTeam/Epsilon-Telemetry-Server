import { Injectable, EventEmitter } from '@angular/core';

import { BatteryFaults } from '../_objects/faults/battery-faults';
import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
import { MotorFaults } from '../_objects/faults/motor-faults';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class FaultsService {

  batteryFaults$: EventEmitter<BatteryFaults>;
  motor0Faults$: EventEmitter<MotorFaults>;
  motor1Faults$: EventEmitter<MotorFaults>;

  private batteryFaults: BatteryFaults;
  private motor0Faults: MotorFaults;
  private motor1Faults: MotorFaults;

  constructor(private wsService: WebSocketService) {
    this.batteryFaults$ = new EventEmitter<BatteryFaults>();
    this.motor0Faults$ = new EventEmitter<MotorFaults>();
    this.motor1Faults$ = new EventEmitter<MotorFaults>();

    this.batteryFaults = new BatteryFaults;
    this.motor0Faults = new MotorFaults;
    this.motor1Faults = new MotorFaults;

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateBatteryFaults(data);
        this.updateMotorFaults(data, 0);
        this.updateMotorFaults(data, 1);

        this.batteryFaults$.emit(this.getBatteryFaults());
        this.motor0Faults$.emit(this.getMotorFaults(0));
        this.motor1Faults$.emit(this.getMotorFaults(1));
      }
    );
  }

  getBatteryFaults(): BatteryFaults {
    return this.batteryFaults;
  }

  getMotorFaults(num: number): MotorFaults {
    return this[`motor${num}Faults`];
  }

  private updateBatteryFaults(data: INewTelemetryData): void {
    this.batteryFaults.errorFlags.alwaysOnSupplyFault = data.batteryFaults.errorFlags.alwaysOnSupplyFault;
    this.batteryFaults.errorFlags.canbusCommunicationsFault = data.batteryFaults.errorFlags.CANBUSCommunicationFault;
    this.batteryFaults.errorFlags.chargeLimitEnforcementFault = data.batteryFaults.errorFlags.chargeLimitEnforcementFault;
    this.batteryFaults.errorFlags.chargerSafetyRelayFault = data.batteryFaults.errorFlags.chargerSafetyRelayFault;
    this.batteryFaults.errorFlags.currentSensorFault = data.batteryFaults.errorFlags.currentSensorFault;
    this.batteryFaults.errorFlags.dischargeLimitEnforcementFault = data.batteryFaults.errorFlags.dischargeLimitEnforcementFault;
    this.batteryFaults.errorFlags.fanMonitorFault = data.batteryFaults.errorFlags.fanMonitorFault;
    this.batteryFaults.errorFlags.highVoltageIsolationFault = data.batteryFaults.errorFlags.highVoltageIsolationFault;
    this.batteryFaults.errorFlags.internalCommunicationFault = data.batteryFaults.errorFlags.internalCommunicationFault;
    this.batteryFaults.errorFlags.internalConversionFault = data.batteryFaults.errorFlags.internalConversionFault;
    this.batteryFaults.errorFlags.internalLogicFault = data.batteryFaults.errorFlags.internalLogicFault;
    this.batteryFaults.errorFlags.internalMemoryFault = data.batteryFaults.errorFlags.internalMemoryFault;
    this.batteryFaults.errorFlags.internalThermistorFault = data.batteryFaults.errorFlags.internalThermistorsFault;
    this.batteryFaults.errorFlags.lowCellVoltageFault = data.batteryFaults.errorFlags.lowCellVoltageFault;
    this.batteryFaults.errorFlags.openWiringFault = data.batteryFaults.errorFlags.openWiringFault;
    this.batteryFaults.errorFlags.packVoltageSensorFault = data.batteryFaults.errorFlags.packVoltageSensorFault;
    this.batteryFaults.errorFlags.thermistorFault = data.batteryFaults.errorFlags.thermistorFault;
    this.batteryFaults.errorFlags.twelvevpowerSupplyFault = data.batteryFaults.errorFlags.powerSupply12VFault;
    this.batteryFaults.errorFlags.voltageRedundancyFault = data.batteryFaults.errorFlags.voltageRedundancyFault;
    this.batteryFaults.errorFlags.weakCellFault = data.batteryFaults.errorFlags.weakCellFault;
    this.batteryFaults.errorFlags.weakPackFault = data.batteryFaults.errorFlags.weakPackFault;
    this.batteryFaults.limitFlags.cclReducedDueToAlternateCurrentLimit = data.batteryFaults.limitFlags.cclReducedDueToAlternateCurrentLimit;
    this.batteryFaults.limitFlags.cclReducedDueToChargerLatch = data.batteryFaults.limitFlags.cclReducedDueToChargerLatch;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellResistance = data.batteryFaults.limitFlags.cclReducedDueToHighCellResistance;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellVoltage = data.batteryFaults.limitFlags.cclReducedDueToHighCellVoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighPackVoltage = data.batteryFaults.limitFlags.cclReducedDueToHighPackVoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighSoc = data.batteryFaults.limitFlags.cclReducedDueToHighSoc;
    this.batteryFaults.limitFlags.cclReducedDueToTemperature = data.batteryFaults.limitFlags.cclReducedDueToTemperature;
    this.batteryFaults.limitFlags.dclReducedDueToHighCellResistance = data.batteryFaults.limitFlags.dclReducedDueToHighCellResistance;
    this.batteryFaults.limitFlags.dclReducedDueToLowCellVoltage = data.batteryFaults.limitFlags.dclReducedDueToLowCellVoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowPackVoltage = data.batteryFaults.limitFlags.dclReducedDueToLowPackVoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowSoc = data.batteryFaults.limitFlags.dclReducedDueToLowSoc;
    this.batteryFaults.limitFlags.dclReducedDueToTemperature = data.batteryFaults.limitFlags.dclReducedDueToTemperature;
    this.batteryFaults.limitFlags.dclandcclReducedDueToCommunicationFailsafe = data.batteryFaults.limitFlags.dclAndCclReducedDueToCommunicationFailsafe;
    this.batteryFaults.limitFlags.dclandcclReducedDueToVoltageFailsafe = data.batteryFaults.limitFlags.dclAndCclReducedDueToVoltageFailsafe;
  }

  private updateMotorFaults(data: INewTelemetryData, num: number): void {
    this[`motor${num}Faults`].errorFlags.badMotorPositionHallSequence = data.motorFaults[num].errorFlags.badMotorPositionHallSequence;
    this[`motor${num}Faults`].errorFlags.configReadError = data.motorFaults[num].errorFlags.configReadError;
    this[`motor${num}Faults`].errorFlags.dcBusOverVoltage = data.motorFaults[num].errorFlags.dcBusOverVoltage;
    this[`motor${num}Faults`].errorFlags.desaturationFault = data.motorFaults[num].errorFlags.desaturationFault;
    this[`motor${num}Faults`].errorFlags.motorOverSpeed = data.motorFaults[num].errorFlags.motorOverSpeed;
    this[`motor${num}Faults`].errorFlags.rail15VUnderVoltageLockOut = data.motorFaults[num].errorFlags.rail15VUnderVoltageLockOut;
    this[`motor${num}Faults`].errorFlags.softwareOverCurrent = data.motorFaults[num].errorFlags.softwareOverCurrent;
    this[`motor${num}Faults`].errorFlags.watchdogCausedLastReset = data.motorFaults[num].errorFlags.watchdogCausedLastReset;
    this[`motor${num}Faults`].limitFlags.busCurrent = data.motorFaults[num].limitFlags.busCurrent;
    this[`motor${num}Faults`].limitFlags.busVoltageLower = data.motorFaults[num].limitFlags.busVoltageLower;
    this[`motor${num}Faults`].limitFlags.busVoltageUpper = data.motorFaults[num].limitFlags.busVoltageUpper;
    this[`motor${num}Faults`].limitFlags.ipmOrMotorTemperature = data.motorFaults[num].limitFlags.ipmOrMotorTemperature;
    this[`motor${num}Faults`].limitFlags.motorCurrent = data.motorFaults[num].limitFlags.motorCurrent;
    this[`motor${num}Faults`].limitFlags.outputVoltagePwm = data.motorFaults[num].limitFlags.outputVoltagePwm;
    this[`motor${num}Faults`].limitFlags.velocity = data.motorFaults[num].limitFlags.velocity;
    this[`motor${num}Faults`].rxErrorCount = data.motorFaults[num].rxErrorCount;
    this[`motor${num}Faults`].txErrorCount = data.motorFaults[num].txErrorCount;
  }
}
