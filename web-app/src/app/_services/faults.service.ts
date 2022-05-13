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
    this.batteryFaults.errorFlags.alwaysOnSupplyFault = data.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault;
    this.batteryFaults.errorFlags.canbusCommunicationsFault = data.BatteryFaults.ErrorFlags.CANBUSCommunicationFault;
    this.batteryFaults.errorFlags.chargeLimitEnforcementFault = data.BatteryFaults.ErrorFlags.ChargeLimitEnforcementFault;
    this.batteryFaults.errorFlags.chargerSafetyRelayFault = data.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault;
    this.batteryFaults.errorFlags.currentSensorFault = data.BatteryFaults.ErrorFlags.CurrentSensorFault;
    this.batteryFaults.errorFlags.dischargeLimitEnforcementFault = data.BatteryFaults.ErrorFlags.DischargeLimitEnforcementFault;
    this.batteryFaults.errorFlags.fanMonitorFault = data.BatteryFaults.ErrorFlags.FanMonitorFault;
    this.batteryFaults.errorFlags.highVoltageIsolationFault = data.BatteryFaults.ErrorFlags.HighVoltageIsolationFault;
    this.batteryFaults.errorFlags.internalCommunicationFault = data.BatteryFaults.ErrorFlags.InternalCommunicationFault;
    this.batteryFaults.errorFlags.internalConversionFault = data.BatteryFaults.ErrorFlags.InternalConversionFault;
    this.batteryFaults.errorFlags.internalLogicFault = data.BatteryFaults.ErrorFlags.InternalLogicFault;
    this.batteryFaults.errorFlags.internalMemoryFault = data.BatteryFaults.ErrorFlags.InternalMemoryFault;
    this.batteryFaults.errorFlags.internalThermistorFault = data.BatteryFaults.ErrorFlags.InternalThermistorsFault;
    this.batteryFaults.errorFlags.lowCellVoltageFault = data.BatteryFaults.ErrorFlags.LowCellVoltageFault;
    this.batteryFaults.errorFlags.openWiringFault = data.BatteryFaults.ErrorFlags.OpenWiringFault;
    this.batteryFaults.errorFlags.packVoltageSensorFault = data.BatteryFaults.ErrorFlags.PackVoltageSensorFault;
    this.batteryFaults.errorFlags.thermistorFault = data.BatteryFaults.ErrorFlags.thermistorFault;
    this.batteryFaults.errorFlags.twelvevpowerSupplyFault = data.BatteryFaults.ErrorFlags["12vPowerSupplyFault"];
    this.batteryFaults.errorFlags.voltageRedundancyFault = data.BatteryFaults.ErrorFlags.VoltageRedundancyFault;
    this.batteryFaults.errorFlags.weakCellFault = data.BatteryFaults.ErrorFlags.WeakCellFault;
    this.batteryFaults.errorFlags.weakPackFault = data.BatteryFaults.ErrorFlags.WeakPackFault;
    this.batteryFaults.limitFlags.cclReducedDueToAlternateCurrentLimit = data.BatteryFaults.LimitFlags.CclReducedDueToAlternateCurrentLimit;
    this.batteryFaults.limitFlags.cclReducedDueToChargerLatch = data.BatteryFaults.LimitFlags.CclReducedDueToChargerLatch;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellResistance = data.BatteryFaults.LimitFlags.CclReducedDueToHighCellResistance;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellVoltage = data.BatteryFaults.LimitFlags.CclReducedDueToHighCellVoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighPackVoltage = data.BatteryFaults.LimitFlags.CclReducedDueToHighPackVoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighSoc = data.BatteryFaults.LimitFlags.DclReducedDueToHighSoc;
    this.batteryFaults.limitFlags.cclReducedDueToTemperature = data.BatteryFaults.LimitFlags.CclReducedDueToTemperature;
    this.batteryFaults.limitFlags.dclReducedDueToHighCellResistance = data.BatteryFaults.LimitFlags.DclReducedDueToHighCellResistance;
    this.batteryFaults.limitFlags.dclReducedDueToLowCellVoltage = data.BatteryFaults.LimitFlags.DclReducedDueToLowCellVoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowPackVoltage = data.BatteryFaults.LimitFlags.DclReducedDueToLowPackVoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowSoc = data.BatteryFaults.LimitFlags.DclReducedDueToLowSoc;
    this.batteryFaults.limitFlags.dclReducedDueToTemperature = data.BatteryFaults.LimitFlags.DclReducedDueToTemperature;
    this.batteryFaults.limitFlags.dclandcclReducedDueToCommunicationFailsafe = data.BatteryFaults.LimitFlags.DclAndCclReducedDueToCommunicationFailsafe;
    this.batteryFaults.limitFlags.dclandcclReducedDueToVoltageFailsafe = data.BatteryFaults.LimitFlags.DclAndCclReducedDueToVoltageFailsafe;
  }

  private updateMotorFaults(data: INewTelemetryData, num: number): void {
    this[`motor${num}Faults`].errorFlags.badMotorPositionHallSequence = data.MotorFaults[num].ErrorFlags.BadMotorPositionHallSequence;
    this[`motor${num}Faults`].errorFlags.configReadError = data.MotorFaults[num].ErrorFlags.ConfigReadError;
    this[`motor${num}Faults`].errorFlags.dcBusOverVoltage = data.MotorFaults[num].ErrorFlags.DcBusOverVoltage;
    this[`motor${num}Faults`].errorFlags.desaturationFault = data.MotorFaults[num].ErrorFlags.DesaturationFault;
    this[`motor${num}Faults`].errorFlags.motorOverSpeed = data.MotorFaults[num].ErrorFlags.MotorOverSpeed;
    this[`motor${num}Faults`].errorFlags.rail15VUnderVoltageLockOut = data.MotorFaults[num].ErrorFlags.Wail15VUnderVoltageLockOut;
    this[`motor${num}Faults`].errorFlags.softwareOverCurrent = data.MotorFaults[num].ErrorFlags.SoftwareOverCurrent;
    this[`motor${num}Faults`].errorFlags.watchdogCausedLastReset = data.MotorFaults[num].ErrorFlags.WatchdogCausedLastReset;
    this[`motor${num}Faults`].limitFlags.busCurrent = data.MotorFaults[num].LimitFlags.BusCurrent;
    this[`motor${num}Faults`].limitFlags.busVoltageLower = data.MotorFaults[num].LimitFlags.BusVoltageLower;
    this[`motor${num}Faults`].limitFlags.busVoltageUpper = data.MotorFaults[num].LimitFlags.BusVoltageUpper;
    this[`motor${num}Faults`].limitFlags.ipmOrMotorTemperature = data.MotorFaults[num].LimitFlags.IpmOrMotorTemperature;
    this[`motor${num}Faults`].limitFlags.motorCurrent = data.MotorFaults[num].LimitFlags.MotorCurrent;
    this[`motor${num}Faults`].limitFlags.outputVoltagePwm = data.MotorFaults[num].LimitFlags.OutputVoltagePwm;
    this[`motor${num}Faults`].limitFlags.velocity = data.MotorFaults[num].LimitFlags.Velocity;
    this[`motor${num}Faults`].rxErrorCount = data.MotorFaults[num].RxErrorCount;
    this[`motor${num}Faults`].txErrorCount = data.MotorFaults[num].TxErrorCount;
  }
}
