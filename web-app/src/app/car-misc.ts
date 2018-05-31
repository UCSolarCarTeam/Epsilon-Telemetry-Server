export class CarMisc {
  directionForward: boolean;
  directionReverse: boolean;
  brakes: boolean;
  hazard: boolean;
  regenBraking: number;
  acceleration: number;
  setCurrent: number;
  busCurrent: number;
  busVoltage: number;
  setVelocity: number;
  vehicleVelocity: number;
  totalArrayPower: number;
  bmsStrobeLight: boolean;
  velocityTotal: number;

  constructor(
    directionForward: boolean,
    directionReverse: boolean,
    brakes: boolean,
    hazard: boolean,
    regenBraking: number,
    acceleration: number,
    setCurrent: number,
    busCurrent: number,
    busVoltage: number,
    setVelocity: number,
    vehicleVelocity: number,
    totalArrayPower: number,
    bmsStrobeLight: boolean) {
      this.directionForward = directionForward;
      this.directionReverse = directionReverse;
      this.brakes = brakes;
      this.hazard = hazard;
      this.regenBraking = regenBraking;
      this.acceleration = acceleration;
      this.setCurrent = setCurrent;
      this.busCurrent = busCurrent;
      this.busVoltage = busVoltage;
      this.setVelocity = setVelocity;
      this.vehicleVelocity = vehicleVelocity;
      this.totalArrayPower = totalArrayPower;
      this.bmsStrobeLight = bmsStrobeLight;
      this.velocityTotal = this.setVelocity + this.vehicleVelocity;
  }

  getSetVelocityPercentage(): number {
    return this.setVelocity / this.velocityTotal * 100;
  }

  getVehicleVelocityPercentage(): number {
    return this.vehicleVelocity / this.velocityTotal * 100;
  }
}
