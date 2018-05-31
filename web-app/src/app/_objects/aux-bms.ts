export enum State {
  Off = 'Off',
  COMMON_ENGAGED = 'Common Engaged',
  CHARGE_ENGAGED = 'Charge Engaged',
  DISCHARGE_ENGAGED = 'Discharge Engaged',
  ALL_ENGAGED = 'All engaged'
}

export class AuxBms {
  allowCharge = false;
  alive = false;
  auxVoltage = -1;
  contactorError = false;
  prechargeState: State = State.off;
  strobeBmsLight = false;
}
