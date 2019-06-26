import { Injectable, EventEmitter } from '@angular/core';

import { BatteryFaults } from '../_objects/faults/battery-faults';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
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
      (data: ITelemetryData) => {
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

  private updateBatteryFaults(data: ITelemetryData): void {
    this.batteryFaults.errorFlags.alwaysOnSupplyFault = data.alwaysonsupplyfault;
    this.batteryFaults.errorFlags.canbusCommunicationsFault = data.canbuscommunicationsfault;
    this.batteryFaults.errorFlags.chargeLimitEnforcementFault = data.chargelimitenforcementfault;
    this.batteryFaults.errorFlags.chargerSafetyRelayFault = data.chargersafetyrelayfault;
    this.batteryFaults.errorFlags.currentSensorFault = data.currentsensorfault;
    this.batteryFaults.errorFlags.dischargeLimitEnforcementFault = data.dischargelimitenforcementfault;
    this.batteryFaults.errorFlags.fanMonitorFault = data.fanmonitorfault;
    this.batteryFaults.errorFlags.highVoltageIsolationFault = data.highvoltageisolationfault;
    this.batteryFaults.errorFlags.internalCommunicationFault = data.internalcommunicationfault;
    this.batteryFaults.errorFlags.internalConversionFault = data.internalconversionfault;
    this.batteryFaults.errorFlags.internalLogicFault = data.internallogicfault;
    this.batteryFaults.errorFlags.internalMemoryFault = data.internalmemoryfault;
    this.batteryFaults.errorFlags.internalThermistorFault = data.internalthermistorfault;
    this.batteryFaults.errorFlags.lowCellVoltageFault = data.lowcellvoltagefault;
    this.batteryFaults.errorFlags.openWiringFault = data.openwiringfault;
    this.batteryFaults.errorFlags.packVoltageSensorFault = data.packvoltagesensorfault;
    this.batteryFaults.errorFlags.thermistorFault = data.thermistorfault;
    this.batteryFaults.errorFlags.twelvevpowerSupplyFault = data.twelvevpowersupplyfault;
    this.batteryFaults.errorFlags.voltageRedundancyFault = data.voltageredundancyfault;
    this.batteryFaults.errorFlags.weakCellFault = data.weakcellfault;
    this.batteryFaults.errorFlags.weakPackFault = data.weakpackfault;
    this.batteryFaults.limitFlags.cclReducedDueToAlternateCurrentLimit = data.cclreducedduetoalternatecurrentlimit;
    this.batteryFaults.limitFlags.cclReducedDueToChargerLatch = data.cclreducedduetochargerlatch;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellResistance = data.cclreducedduetohighcellresistance;
    this.batteryFaults.limitFlags.cclReducedDueToHighCellVoltage = data.cclreducedduetohighcellvoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighPackVoltage = data.cclreducedduetohighpackvoltage;
    this.batteryFaults.limitFlags.cclReducedDueToHighSoc = data.cclreducedduetohighsoc;
    this.batteryFaults.limitFlags.cclReducedDueToTemperature = data.cclreducedduetotemperature;
    this.batteryFaults.limitFlags.dclReducedDueToHighCellResistance = data.dclreducedduetohighcellresistance;
    this.batteryFaults.limitFlags.dclReducedDueToLowCellVoltage = data.dclreducedduetolowcellvoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowPackVoltage = data.dclreducedduetolowpackvoltage;
    this.batteryFaults.limitFlags.dclReducedDueToLowSoc = data.dclreducedduetolowsoc;
    this.batteryFaults.limitFlags.dclReducedDueToTemperature = data.dclreducedduetotemperature;
    this.batteryFaults.limitFlags.dclandcclReducedDueToCommunicationFailsafe = data.dclandcclreducedduetocommunicationfailsafe;
    this.batteryFaults.limitFlags.dclandcclReducedDueToVoltageFailsafe = data.dclandcclreducedduetovoltagefailsafe;
  }

  private updateMotorFaults(data: ITelemetryData, num: number): void {
    this[`motor${num}Faults`].errorFlags.badMotorPositionHallSequence = data[`motor${num}badmotorpositionhallsequenceerror`];
    this[`motor${num}Faults`].errorFlags.configReadError = data[`motor${num}configreaderrorerror`];
    this[`motor${num}Faults`].errorFlags.dcBusOverVoltage = data[`motor${num}dcbusovervoltageerror`];
    this[`motor${num}Faults`].errorFlags.desaturationFault = data[`motor${num}desaturationfaulterror`];
    this[`motor${num}Faults`].errorFlags.motorOverSpeed = data[`motor${num}overspeederror`];
    this[`motor${num}Faults`].errorFlags.rail15VUnderVoltageLockOut = data[`motor${num}rail15vundervoltagelockouterror`];
    this[`motor${num}Faults`].errorFlags.softwareOverCurrent = data[`motor${num}softwareovercurrenterror`];
    this[`motor${num}Faults`].errorFlags.watchdogCausedLastReset = data[`motor${num}watchdogcausedlastreseterror`];
    this[`motor${num}Faults`].limitFlags.busCurrent = data[`motor${num}buscurrentlimit`];
    this[`motor${num}Faults`].limitFlags.busVoltageLower = data[`motor${num}busvoltagelowerlimit`];
    this[`motor${num}Faults`].limitFlags.busVoltageUpper = data[`motor${num}busvoltageupperlimit`];
    this[`motor${num}Faults`].limitFlags.ipmOrMotorTemperature = data[`motor${num}ipmormotortemperaturelimit`];
    this[`motor${num}Faults`].limitFlags.motorCurrent = data[`motor${num}currentlimit`];
    this[`motor${num}Faults`].limitFlags.outputVoltagePwm = data[`motor${num}outputvoltagepwmlimit`];
    this[`motor${num}Faults`].limitFlags.velocity = data[`motor${num}velocitylimit`];
    this[`motor${num}Faults`].rxErrorCount = data[`motor${num}rxerrorcount`];
    this[`motor${num}Faults`].txErrorCount = data[`motor${num}txerrorcount`];
  }
}
