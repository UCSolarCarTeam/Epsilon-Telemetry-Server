export enum State {
  OFF = "Off",
  COMMON_ENGAGED = "Common Engaged",
  CHARGE_ENGAGED = "Charge Engaged",
  DISCHARGE_ENGAGED = "Discharge Engaged",
  ALL_ENGAGED = "All engaged"
}

export class BatteryMisc {
  totalPackCapacity: number;
  packStateOfCharge: number;
  packStateOfChargeHrs: number;
  highestCellTemp: number;
  lowestCellVoltage: number;
  packCurrent: number;
  packVoltage: number;
  prechargeState: State;
}
