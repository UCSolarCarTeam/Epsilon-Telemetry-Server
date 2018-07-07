export class MotorFaults {
  errorFlags: MotorErrorFlags = {
    badMotorPositionHallSequence: false,
    configReadError: false,
    dcBusOverVoltage: false,
    desaturationFault: false,
    motorOverSpeed: false,
    rail15VUnderVoltageLockOut: false,
    softwareOverCurrent: false,
    watchdogCausedLastReset: false
  };
  limitFlags: MotorLimitFlags = {
    busCurrent: false,
    busVoltageLower: false,
    busVoltageUpper: false,
    ipmOrMotorTemperature: false,
    motorCurrent: false,
    outputVoltagePwm: false,
    velocity: false
  };
  rxErrorCount = -1;
  txErrorCount = -1;
}

class MotorErrorFlags {
  badMotorPositionHallSequence: boolean;
  configReadError: boolean;
  dcBusOverVoltage: boolean;
  desaturationFault: boolean;
  motorOverSpeed: boolean;
  rail15VUnderVoltageLockOut: boolean;
  softwareOverCurrent: boolean;
  watchdogCausedLastReset: boolean;
}

class MotorLimitFlags {
  busCurrent: boolean;
  busVoltageLower: boolean;
  busVoltageUpper: boolean;
  ipmOrMotorTemperature: boolean;
  motorCurrent: boolean;
  outputVoltagePwm: boolean;
  velocity: boolean;
}
