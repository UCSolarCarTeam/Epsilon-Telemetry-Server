const pg = require('pg');
const pg_pool = new pg.Pool({
  user: 'epsilon',
  database: 'epsilontelemetrydb',
  password: 'UCalgarySolar',
  port: 5432,
});
const db_errors = {
  CONNECT_ERROR: 'Cannot connect to PostgreSQL',
  INSERT_ERROR: 'Error while inserting into database',
  SELECT_ERROR: 'Error during SELECT query',
}

module.exports.pool = pg_pool;
module.exports.errors = db_errors;

/**
 * Function that maps the JSON object fields from the DigitalOcean RabbitMQ
 * to the PostgreSQL database columns.
 * 
 * @param {JSON Object from RabbitMQ} jsonObj 
 */
module.exports.mapJsonToColumns = function(jsonObj) {
  let mapping = '';
  mapping += '\'' + jsonObj['TimeStamp'] + '\', ';
  mapping += '\'' + jsonObj['PacketTitle'] + '\', ';
  mapping += jsonObj['KeyMotor'][0]['Alive'] + ', ';
  mapping += jsonObj['KeyMotor'][0]['SetCurrent'] + ', ';
  mapping += jsonObj['KeyMotor'][0]['SetVelocity'] + ', ';
  mapping += jsonObj['KeyMotor'][0]['BusCurrent'] + ', ';
  mapping += jsonObj['KeyMotor'][0]['BusVoltage'] + ', ';
  mapping += jsonObj['KeyMotor'][0]['VehicleVelocity'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['PhaseCCurrent'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['PhaseBCurrent'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['MotorVoltageReal'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['MotorVoltageImaginary'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['MotorCurrentReal'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['MotorCurrentImaginary'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['BackEmf'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['VoltageRail15VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['VoltageRail3VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['VoltageRail1VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['HeatSinkTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['MotorTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['DspBoardTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['DcBusAmpHours'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['Odometer'] + ', ';
  mapping += jsonObj['MotorDetails'][0]['SlipSpeed'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['Alive'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['SetCurrent'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['SetVelocity'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['BusCurrent'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['BusVoltage'] + ', ';
  mapping += jsonObj['KeyMotor'][1]['VehicleVelocity'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['PhaseCCurrent'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['PhaseBCurrent'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['MotorVoltageReal'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['MotorVoltageImaginary'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['MotorCurrentReal'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['MotorCurrentImaginary'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['BackEmf'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['VoltageRail15VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['VoltageRail3VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['VoltageRail1VSupply'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['HeatSinkTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['MotorTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['DspBoardTemp'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['DcBusAmpHours'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['Odometer'] + ', ';
  mapping += jsonObj['MotorDetails'][1]['SlipSpeed'] + ', ';
  mapping += jsonObj['DriverControls']['Alive'] + ', ';
  mapping += jsonObj['DriverControls']['HeadlightsOff'] + ', ';
  mapping += jsonObj['DriverControls']['HeadlightsLow'] + ', ';
  mapping += jsonObj['DriverControls']['HeadlightsHigh'] + ', ';
  mapping += jsonObj['DriverControls']['SignalRight'] + ', ';
  mapping += jsonObj['DriverControls']['SignalLeft'] + ', ';
  mapping += jsonObj['DriverControls']['Hazard'] + ', ';
  mapping += jsonObj['DriverControls']['Interior'] + ', ';
  mapping += jsonObj['DriverControls']['Aux'] + ', ';
  mapping += jsonObj['DriverControls']['VolumeUp'] + ', ';
  mapping += jsonObj['DriverControls']['VolumeDown'] + ', ';
  mapping += jsonObj['DriverControls']['NextSong'] + ', ';
  mapping += jsonObj['DriverControls']['PrevSong'] + ', ';
  mapping += jsonObj['DriverControls']['Acceleration'] + ', ';
  mapping += jsonObj['DriverControls']['RegenBraking'] + ', ';
  mapping += jsonObj['DriverControls']['Brakes'] + ', ';
  mapping += jsonObj['DriverControls']['Forward'] + ', ';
  mapping += jsonObj['DriverControls']['Reverse'] + ', ';
  mapping += jsonObj['DriverControls']['PushToTalk'] + ', ';
  mapping += jsonObj['DriverControls']['Horn'] + ', ';
  mapping += jsonObj['DriverControls']['Reset'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['MotorOverSpeed'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['SoftwareOverCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['DcBusOverVoltage'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['BadMotorPositionHallSequence'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['WatchdogCausedLastReset'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['ConfigReadError'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['Rail15VUnderVoltageLockOut'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['ErrorFlags']['DesaturationFault'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['OutputVoltagePwm'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['MotorCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['Velocity'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['BusCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['BusVoltageUpper'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['BusVoltageLower'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['LimitFlags']['IpmOrMotorTemperature'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['RxErrorCount'] + ', ';
  mapping += jsonObj['MotorFaults'][0]['TxErrorCount'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['MotorOverSpeed'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['SoftwareOverCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['DcBusOverVoltage'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['BadMotorPositionHallSequence'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['WatchdogCausedLastReset'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['ConfigReadError'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['Rail15VUnderVoltageLockOut'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['ErrorFlags']['DesaturationFault'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['OutputVoltagePwm'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['MotorCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['Velocity'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['BusCurrent'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['BusVoltageUpper'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['BusVoltageLower'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['LimitFlags']['IpmOrMotorTemperature'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['RxErrorCount'] + ', ';
  mapping += jsonObj['MotorFaults'][1]['TxErrorCount'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['InternalCommunicationFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['InternalConversionFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['WeakCellFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['LowCellVoltageFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['OpenWiringFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['CurrentSensorFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['PackVoltageSensorFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['WeakPackFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['VoltageRedundancyFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['FanMonitorFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['ThermistorFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['CANBUSCommunicationsFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['AlwaysOnSupplyFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['HighVoltageIsolationFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['12vPowerSupplyFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['ChargeLimitEnforcementFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['DischargeLimitEnforcementFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['ChargerSafetyRelayFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['InternalMemoryFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['InternalThermistorFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['ErrorFlags']['InternalLogicFault'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowSoc'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToHighCellResistance'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToTemperature'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowCellVoltage'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowPackVoltage'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclandCclReducedDueToVoltageFailsafe'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['DclandCclReducedDueToCommunicationFailsafe'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighSoc'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighCellResistance'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToTemperature'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighCellVoltage'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighPackVoltage'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToChargerLatch'] + ', ';
  mapping += jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToAlternateCurrentLimit'] + ', ';
  mapping += jsonObj['Battery']['Alive'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['DischargeRelayEnabled'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['ChargeRelayEnabled'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['ChargerSafetyEnabled'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['MalfunctionIndicatorActive'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['MultiPurposeInputSignalStatus'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['AlwaysOnSignalStatus'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['IsReadySignalStatus'] + ', ';
  mapping += jsonObj['Battery']['BMSRelayStatusFlags']['IsChargingSignalStatus'] + ', ';
  mapping += jsonObj['Battery']['PopulatedCells'] + ', ';
  mapping += jsonObj['Battery']['12vInputVoltage'] + ', ';
  mapping += jsonObj['Battery']['FanVoltage'] + ', ';
  mapping += jsonObj['Battery']['PackCurrent'] + ', ';
  mapping += jsonObj['Battery']['PackVoltage'] + ', ';
  mapping += jsonObj['Battery']['PackStateOfCharge'] + ', ';
  mapping += jsonObj['Battery']['PackAmphours'] + ', ';
  mapping += jsonObj['Battery']['PackDepthOfDischarge'] + ', ';
  mapping += jsonObj['Battery']['HighTemperature'] + ', ';
  mapping += jsonObj['Battery']['HighThermistorId'] + ', ';
  mapping += jsonObj['Battery']['LowTemperature'] + ', ';
  mapping += jsonObj['Battery']['LowThermistorId'] + ', ';
  mapping += jsonObj['Battery']['AverageTemperature'] + ', ';
  mapping += jsonObj['Battery']['InternalTemperature'] + ', ';
  mapping += jsonObj['Battery']['FanSpeed'] + ', ';
  mapping += jsonObj['Battery']['RequestedFanSpeed'] + ', ';
  mapping += jsonObj['Battery']['LowCellVoltage'] + ', ';
  mapping += jsonObj['Battery']['LowCellVoltageId'] + ', ';
  mapping += jsonObj['Battery']['HighCellVoltage'] + ', ';
  mapping += jsonObj['Battery']['HighCellVoltageId'] + ', ';
  mapping += jsonObj['Battery']['AverageCellVoltage'] + ', ';
  // Ignore PrechargeState until Hermes is updated
  // and replace with Off instead
  // mapping += jsonObj['Battery']['PrechargeState'] + ', ';
  mapping += '\'Off\', ';
  mapping += jsonObj['Battery']['AuxVoltage'] + ', ';
  mapping += jsonObj['Battery']['AuxBmsAlive'] + ', ';
  mapping += jsonObj['MPPT'][0]['Alive'] + ', ';
  mapping += jsonObj['MPPT'][0]['ArrayVoltage'] + ', ';
  mapping += jsonObj['MPPT'][0]['ArrayCurrent'] + ', ';
  mapping += jsonObj['MPPT'][0]['BatteryVoltage'] + ', ';
  mapping += jsonObj['MPPT'][0]['Temperature'] + ', ';
  mapping += jsonObj['MPPT'][1]['Alive'] + ', ';
  mapping += jsonObj['MPPT'][1]['ArrayVoltage'] + ', ';
  mapping += jsonObj['MPPT'][1]['ArrayCurrent'] + ', ';
  mapping += jsonObj['MPPT'][1]['BatteryVoltage'] + ', ';
  mapping += jsonObj['MPPT'][1]['Temperature'] + ', ';
  mapping += jsonObj['MPPT'][2]['Alive'] + ', ';
  mapping += jsonObj['MPPT'][2]['ArrayVoltage'] + ', ';
  mapping += jsonObj['MPPT'][2]['ArrayCurrent'] + ', ';
  mapping += jsonObj['MPPT'][2]['BatteryVoltage'] + ', ';
  mapping += jsonObj['MPPT'][2]['Temperature'] + ', ';
  mapping += jsonObj['Lights']['LowBeams'] + ', ';
  mapping += jsonObj['Lights']['HighBeams'] + ', ';
  mapping += jsonObj['Lights']['Brakes'] + ', ';
  mapping += jsonObj['Lights']['LeftSignal'] + ', ';
  mapping += jsonObj['Lights']['RightSignal'] + ', ';
  mapping += jsonObj['Lights']['BmsStrobeLight'] + ', ';
  // Ignore lightsalive until Hermes is Updated
  // mapping += jsonObj['Lights']['LightsAlive']
  mapping += 'NULL, '; // lightsalive
  mapping += jsonObj['Battery']['StrobeBmsLight'] + ', ';
  mapping += jsonObj['Battery']['AllowCharge'] + ', ';
  mapping += jsonObj['Battery']['ContactorError'];
  return mapping;
};
