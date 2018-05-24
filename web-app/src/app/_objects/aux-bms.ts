export class AuxBms {
  allowCharge = false;
  alive = false;
  auxVoltage = -1;
  contactorError = false;
  prechargeState: State = State.OFF;
  strobeBmsLight = false;
}

export enum State {
  OFF = 'Off',
  COMMON_ENGAGED = 'Common Engaged',
  CHARGE_ENGAGED = 'Charge Engaged',
  DISCHARGE_ENGAGED = 'Discharge Engaged',
  ALL_ENGAGED = 'All engaged'
}
