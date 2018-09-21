export class Motor {
  // KeyMotor
  alive = false;
  busCurrent = -100;
  busVoltage = -1;
  setCurrent = -1;
  setVelocity = -1;
  vehicleVelocity = -1;

  // MotorDetails
  backEmf = -1;
  dcBusAmpHours = -1;
  dspBoardTemp = -100;
  heatSinkTemp = -100;
  motorCurrentImaginary = -100;
  motorCurrentReal = -1;
  motorTemp = -1;
  motorVoltageImaginary = -1;
  motorVoltageReal = -1;
  odometer = -1;
  phaseBCurrent = -1;
  phaseCCurrent = -1;
  slipSpeed = -1;
  voltageRail15VSupply = -1;
  voltageRail1VSupply = -1;
  voltageRail3VSupply = -1;
}
