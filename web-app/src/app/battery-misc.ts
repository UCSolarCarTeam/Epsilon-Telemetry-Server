enum State {OFF, COMMON_ENGAGED, CHARGE_ENGAGED, DISCHARGE_ENGAGED, ALL_ENGAGED}

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
