export enum State {
  ALL_ENGAGED = 'All Engaged',
  CHARGE_ENGAGED = 'Charge Engaged',
  COMMON_ENGAGED = 'Common Engaged',
  DISCHARGE_ENGAGED = 'Discharge Engaged',
  Off = 'Off' // Should be OFF = "Off"
}

export class AuxBms {
  alive = false;
  allowCharge = false;
  auxVoltage = -1;
  contactorError = false;
  prechargeState: State = State.Off;
  strobeBmsLight = false;
}
