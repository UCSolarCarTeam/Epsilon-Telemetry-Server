export class Battery {
  alive = false;
  averageCellVoltage = -1;
  averageTemperature = -1;
  bmsRelayStatusFlags: BMSRelayStatusFlags = {
    alwaysOnSignalStatus: false,
    chargeRelayEnabled: false,
    chargerSafetyEnabled: false,
    dischargeRelayEnabled: false,
    isChargingSignalStatus: false,
    isReadySignalStatus: false,
    malfunctionIndicatorActive: false,
    multiPurposeInputSignalStatus: false
  };
  fanSpeed = -1;
  fanVoltage = -1;
  highCellVoltage = -1;
  highCellVoltageId = -1;
  highTemperature = -1;
  highThermistorId = -1;
  internalTemperature = -1;
  lowCellVoltage = -1;
  lowCellVoltageId = -1;
  lowTemperature = -1;
  lowThermistorId = -1;
  packAmphours = -1;
  packCurrent = -1;
  packDepthOfDischarge = -1;
  packStateOfCharge = -1;
  packVoltage = -1;
  populatedCells = -1;
  requestedFanSpeed = -1;
  totalPackCapacity = -1;
  twelvevinputVoltage = -1;
}

class BMSRelayStatusFlags {
  alwaysOnSignalStatus: boolean;
  chargeRelayEnabled: boolean;
  chargerSafetyEnabled: boolean;
  dischargeRelayEnabled: boolean;
  isChargingSignalStatus: boolean;
  isReadySignalStatus: boolean;
  malfunctionIndicatorActive: boolean;
  multiPurposeInputSignalStatus: boolean;
}
