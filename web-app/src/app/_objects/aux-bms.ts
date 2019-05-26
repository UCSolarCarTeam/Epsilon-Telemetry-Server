export enum State {
  ALL_ENGAGED = 'All Engaged',
  CHARGE_ENGAGED = 'Charge Engaged',
  COMMON_ENGAGED = 'Common Engaged',
  DISCHARGE_ENGAGED = 'Discharge Engaged',
  OFF = 'Off'
}

export class AuxBms {
  alive = false;
  allowCharge = false;
  auxVoltage = -1;
  contactorError = false;
  prechargeState: State = State.OFF;
  strobeBmsLight = false;
  highVoltageEnable = false;
}
