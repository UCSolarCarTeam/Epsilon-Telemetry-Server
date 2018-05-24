export class CarMisc {
  velocityTotal: number;

  constructor(
    public directionForward: boolean,
    public directionReverse: boolean,
    public brakes: boolean,
    public hazard: boolean,
    public regenBraking: number,
    public acceleration: number,
    public setCurrent: number,
    public busCurrent: number,
    public busVoltage: number,
    public setVelocity: number,
    public vehicleVelocity: number,
    public totalArrayPower: number,
    public bmsStrobeLight: boolean) {
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
