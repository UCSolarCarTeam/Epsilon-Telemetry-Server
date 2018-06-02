export class BatteryFaults {
  errorFlags: BatteryErrorFlags = {
    alwaysOnSupplyFault: false,
    canbusCommunicationsFault: false,
    chargeLimitEnforcementFault: false,
    chargerSafetyRelayFault: false,
    currentSensorFault: false,
    dischargeLimitEnforcementFault: false,
    fanMonitorFault: false,
    highVoltageIsolationFault: false,
    internalCommunicationFault: false,
    internalConversionFault: false,
    internalLogicFault: false,
    internalMemoryFault: false,
    internalThermistorFault: false,
    lowCellVoltageFault: false,
    openWiringFault: false,
    packVoltageSensorFault: false,
    thermistorFault: false,
    twelvevpowerSupplyFault: false,
    voltageRedundancyFault: false,
    weakCellFault: false,
    weakPackFault: false
  };
  limitFlags: BatteryLimitFlags = {
    cclReducedDueToAlternateCurrentLimit: false,
    cclReducedDueToChargerLatch: false,
    cclReducedDueToHighCellResistance: false,
    cclReducedDueToHighCellVoltage: false,
    cclReducedDueToHighPackVoltage: false,
    cclReducedDueToHighSoc: false,
    cclReducedDueToTemperature: false,
    dclReducedDueToHighCellResistance: false,
    dclReducedDueToLowCellVoltage: false,
    dclReducedDueToLowPackVoltage: false,
    dclReducedDueToLowSoc: false,
    dclReducedDueToTemperature: false,
    dclandcclReducedDueToCommunicationFailsafe: false,
    dclandcclReducedDueToVoltageFailsafe: false
  };
}

class BatteryErrorFlags {
  alwaysOnSupplyFault: boolean;
  canbusCommunicationsFault: boolean;
  chargeLimitEnforcementFault: boolean;
  chargerSafetyRelayFault: boolean;
  currentSensorFault: boolean;
  dischargeLimitEnforcementFault: boolean;
  fanMonitorFault: boolean;
  highVoltageIsolationFault: boolean;
  internalCommunicationFault: boolean;
  internalConversionFault: boolean;
  internalLogicFault: boolean;
  internalMemoryFault: boolean;
  internalThermistorFault: boolean;
  lowCellVoltageFault: boolean;
  openWiringFault: boolean;
  packVoltageSensorFault: boolean;
  thermistorFault: boolean;
  twelvevpowerSupplyFault: boolean;
  voltageRedundancyFault: boolean;
  weakCellFault: boolean;
  weakPackFault: boolean;
}

class BatteryLimitFlags {
  cclReducedDueToAlternateCurrentLimit: boolean;
  cclReducedDueToChargerLatch: boolean;
  cclReducedDueToHighCellResistance: boolean;
  cclReducedDueToHighCellVoltage: boolean;
  cclReducedDueToHighPackVoltage: boolean;
  cclReducedDueToHighSoc: boolean;
  cclReducedDueToTemperature: boolean;
  dclReducedDueToHighCellResistance: boolean;
  dclReducedDueToLowCellVoltage: boolean;
  dclReducedDueToLowPackVoltage: boolean;
  dclReducedDueToLowSoc: boolean;
  dclReducedDueToTemperature: boolean;
  dclandcclReducedDueToCommunicationFailsafe: boolean;
  dclandcclReducedDueToVoltageFailsafe: boolean;
}
