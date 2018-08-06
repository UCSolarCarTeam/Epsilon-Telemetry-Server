const promise = require('promise');
const config = require('../config');

/**
 * Postgres options and handlers
 */
const initOptions = {
  promiseLib: promise,
  // Query handler
  query: function(e) {
    console.log('QUERY:', e.query);
  },
  // Error handler
  error: function(err, e) {
    console.error(err.stack);
    // connection error
    if (e.cn) {
      process.exit(1);
    }
    // query error
    if (e.query) {
      console.error('ERROR: The previous query failed to execute.');
    }
    // context error
    if (e.ctx) {
      console.error('ERROR: An internal database error occured during a transaction or task.');
    }
  },
};

/**
 * Connect to Postgres
 */
const pgp = require('pg-promise')(initOptions);
const db = pgp(config.database);

/**
 * Get table columns and store in a global variable
 */
console.log('Updating column names...');
const columnMap = new Map();
db.any({
  name: 'update-columns',
  text: 'SELECT column_name FROM information_schema.columns ' +
        'WHERE table_schema = \'public\' AND table_name = \'packet\'',
}).then((columns) => {
  columns.slice(1).map((column) => columnMap.set(column.column_name, null));
  console.log('Column names updated');
});

/**
 * Gets table columns as a comma delimited string.
 * @return {string}
 */
module.exports.getColumns = function getColumns() {
  return [...columnMap.keys()].join();
};

/**
 * Parses and inserts a JSON object into the database.
 * @param {string} queryName
 * @param {JSON} jsonObj
 * @return {Promise}
 */
module.exports.insert = function(queryName, jsonObj) {
  const mapObj = jsonToMap(jsonObj);
  const tokens = [...Array(mapObj.size).keys()].map((x) => `$${x+1}`).join();

  return db.one({
    name: queryName,
    text: `INSERT INTO packet (${this.getColumns()}) VALUES (${tokens}) RETURNING *`,
    values: [...mapObj.values()],
  });
};

/**
 * Fetches the last row in the database.
 * @return {Promise}
 */
module.exports.last = function() {
  return db.one({
    name: 'client-init',
    text: 'SELECT * ' +
          'FROM packet ' +
          'ORDER BY timestamp DESC LIMIT 1',
  });
};

/**
 * Function that maps the JSON object fields from the DigitalOcean RabbitMQ
 * to the PostgreSQL database columns.
 *
 * @param {JSON} jsonObj
 * @return {Map}
 */
function jsonToMap(jsonObj) {
  const mapObj = Object.assign(columnMap);
  mapObj.set('timestamp',
    `${jsonObj['TimeStamp']}`);
  mapObj.set('name',
    `${jsonObj['PacketTitle']}`);
  mapObj.set('motor0alive',
    `${jsonObj['KeyMotor'][0]['Alive']}`);
  mapObj.set('motor0setcurrent',
    `${jsonObj['KeyMotor'][0]['SetCurrent']}`);
  mapObj.set('motor0setvelocity',
    `${jsonObj['KeyMotor'][0]['SetVelocity']}`);
  mapObj.set('motor0buscurrent',
    `${jsonObj['KeyMotor'][0]['BusCurrent']}`);
  mapObj.set('motor0busvoltage',
    `${jsonObj['KeyMotor'][0]['BusVoltage']}`);
  mapObj.set('motor0vehiclevelocity',
    `${jsonObj['KeyMotor'][0]['VehicleVelocity']}`);
  mapObj.set('motor0phaseccurrent',
    `${jsonObj['MotorDetails'][0]['PhaseCCurrent']}`);
  mapObj.set('motor0phasebcurrent',
    `${jsonObj['MotorDetails'][0]['PhaseBCurrent']}`);
  mapObj.set('motor0motorvoltagereal',
    `${jsonObj['MotorDetails'][0]['MotorVoltageReal']}`);
  mapObj.set('motor0motorvoltageimaginary',
    `${jsonObj['MotorDetails'][0]['MotorVoltageImaginary']}`);
  mapObj.set('motor0motorcurrentreal',
    `${jsonObj['MotorDetails'][0]['MotorCurrentReal']}`);
  mapObj.set('motor0motorcurrentimaginary',
    `${jsonObj['MotorDetails'][0]['MotorCurrentImaginary']}`);
  mapObj.set('motor0backemf',
    `${jsonObj['MotorDetails'][0]['BackEmf']}`);
  mapObj.set('motor0voltagerail15vsupply',
    `${jsonObj['MotorDetails'][0]['VoltageRail15VSupply']}`);
  mapObj.set('motor0voltagerail3vsupply',
    `${jsonObj['MotorDetails'][0]['VoltageRail3VSupply']}`);
  mapObj.set('motor0voltagerail1vsupply',
    `${jsonObj['MotorDetails'][0]['VoltageRail1VSupply']}`);
  mapObj.set('motor0heatsinktemp',
    `${jsonObj['MotorDetails'][0]['HeatSinkTemp']}`);
  mapObj.set('motor0motortemp',
    `${jsonObj['MotorDetails'][0]['MotorTemp']}`);
  mapObj.set('motor0dspboardtemp',
    `${jsonObj['MotorDetails'][0]['DspBoardTemp']}`);
  mapObj.set('motor0dcbusamphours',
    `${jsonObj['MotorDetails'][0]['DcBusAmpHours']}`);
  mapObj.set('motor0odometer',
    `${jsonObj['MotorDetails'][0]['Odometer']}`);
  mapObj.set('motor0slipspeed',
    `${jsonObj['MotorDetails'][0]['SlipSpeed']}`);
  mapObj.set('motor1alive',
    `${jsonObj['KeyMotor'][1]['Alive']}`);
  mapObj.set('motor1setcurrent',
    `${jsonObj['KeyMotor'][1]['SetCurrent']}`);
  mapObj.set('motor1setvelocity',
    `${jsonObj['KeyMotor'][1]['SetVelocity']}`);
  mapObj.set('motor1buscurrent',
    `${jsonObj['KeyMotor'][1]['BusCurrent']}`);
  mapObj.set('motor1busvoltage',
    `${jsonObj['KeyMotor'][1]['BusVoltage']}`);
  mapObj.set('motor1vehiclevelocity',
    `${jsonObj['KeyMotor'][1]['VehicleVelocity']}`);
  mapObj.set('motor1phaseccurrent',
    `${jsonObj['MotorDetails'][1]['PhaseCCurrent']}`);
  mapObj.set('motor1phasebcurrent',
    `${jsonObj['MotorDetails'][1]['PhaseBCurrent']}`);
  mapObj.set('motor1motorvoltagereal',
    `${jsonObj['MotorDetails'][1]['MotorVoltageReal']}`);
  mapObj.set('motor1motorvoltageimaginary',
    `${jsonObj['MotorDetails'][1]['MotorVoltageImaginary']}`);
  mapObj.set('motor1motorcurrentreal',
    `${jsonObj['MotorDetails'][1]['MotorCurrentReal']}`);
  mapObj.set('motor1motorcurrentimaginary',
    `${jsonObj['MotorDetails'][1]['MotorCurrentImaginary']}`);
  mapObj.set('motor1backemf',
    `${jsonObj['MotorDetails'][1]['BackEmf']}`);
  mapObj.set('motor1voltagerail15vsupply',
    `${jsonObj['MotorDetails'][1]['VoltageRail15VSupply']}`);
  mapObj.set('motor1voltagerail3vsupply',
    `${jsonObj['MotorDetails'][1]['VoltageRail3VSupply']}`);
  mapObj.set('motor1voltagerail1vsupply',
    `${jsonObj['MotorDetails'][1]['VoltageRail1VSupply']}`);
  mapObj.set('motor1heatsinktemp',
    `${jsonObj['MotorDetails'][1]['HeatSinkTemp']}`);
  mapObj.set('motor1motortemp',
    `${jsonObj['MotorDetails'][1]['MotorTemp']}`);
  mapObj.set('motor1dspboardtemp',
    `${jsonObj['MotorDetails'][1]['DspBoardTemp']}`);
  mapObj.set('motor1dcbusamphours',
    `${jsonObj['MotorDetails'][1]['DcBusAmpHours']}`);
  mapObj.set('motor1odometer',
    `${jsonObj['MotorDetails'][1]['Odometer']}`);
  mapObj.set('motor1slipspeed',
    `${jsonObj['MotorDetails'][1]['SlipSpeed']}`);
  mapObj.set('drivercontrolsalive',
    `${jsonObj['DriverControls']['Alive']}`);
  mapObj.set('headlightsoff',
    `${jsonObj['DriverControls']['HeadlightsOff']}`);
  mapObj.set('headlightslow',
    `${jsonObj['DriverControls']['HeadlightsLow']}`);
  mapObj.set('headlightshigh',
    `${jsonObj['DriverControls']['HeadlightsHigh']}`);
  mapObj.set('signalright',
    `${jsonObj['DriverControls']['SignalRight']}`);
  mapObj.set('signalleft',
    `${jsonObj['DriverControls']['SignalLeft']}`);
  mapObj.set('hazard',
    `${jsonObj['DriverControls']['Hazard']}`);
  mapObj.set('interior',
    `${jsonObj['DriverControls']['Interior']}`);
  mapObj.set('aux',
    `${jsonObj['DriverControls']['Aux']}`);
  mapObj.set('volumeup',
    `${jsonObj['DriverControls']['VolumeUp']}`);
  mapObj.set('volumedown',
    `${jsonObj['DriverControls']['VolumeDown']}`);
  mapObj.set('nextsong',
    `${jsonObj['DriverControls']['NextSong']}`);
  mapObj.set('prevsong',
    `${jsonObj['DriverControls']['PrevSong']}`);
  mapObj.set('acceleration',
    `${jsonObj['DriverControls']['Acceleration']}`);
  mapObj.set('regenbraking',
    `${jsonObj['DriverControls']['RegenBraking']}`);
  mapObj.set('brakes',
    `${jsonObj['DriverControls']['Brakes']}`);
  mapObj.set('controlsforward',
    `${jsonObj['DriverControls']['Forward']}`);
  mapObj.set('controlsreverse',
    `${jsonObj['DriverControls']['Reverse']}`);
  mapObj.set('pushtotalk',
    `${jsonObj['DriverControls']['PushToTalk']}`);
  mapObj.set('horn',
    `${jsonObj['DriverControls']['Horn']}`);
  mapObj.set('controlsmotorreset',
    `${jsonObj['DriverControls']['Reset']}`);
  mapObj.set('motor0overspeederror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['MotorOverSpeed']}`);
  mapObj.set('motor0softwareovercurrenterror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['SoftwareOverCurrent']}`);
  mapObj.set('motor0dcbusovervoltageerror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['DcBusOverVoltage']}`);
  mapObj.set('motor0badmotorpositionhallsequenceerror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['BadMotorPositionHallSequence']}`);
  mapObj.set('motor0watchdogcausedlastreseterror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['WatchdogCausedLastReset']}`);
  mapObj.set('motor0configreaderrorerror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['ConfigReadError']}`);
  mapObj.set('motor0rail15vundervoltagelockouterror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['Rail15VUnderVoltageLockOut']}`);
  mapObj.set('motor0desaturationfaulterror',
    `${jsonObj['MotorFaults'][0]['ErrorFlags']['DesaturationFault']}`);
  mapObj.set('motor0outputvoltagepwmlimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['OutputVoltagePwm']}`);
  mapObj.set('motor0currentlimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['MotorCurrent']}`);
  mapObj.set('motor0velocitylimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['Velocity']}`);
  mapObj.set('motor0buscurrentlimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['BusCurrent']}`);
  mapObj.set('motor0busvoltageupperlimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['BusVoltageUpper']}`);
  mapObj.set('motor0busvoltagelowerlimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['BusVoltageLower']}`);
  mapObj.set('motor0ipmormotortemperaturelimit',
    `${jsonObj['MotorFaults'][0]['LimitFlags']['IpmOrMotorTemperature']}`);
  mapObj.set('motor0rxerrorcount',
    `${jsonObj['MotorFaults'][0]['RxErrorCount']}`);
  mapObj.set('motor0txerrorcount',
    `${jsonObj['MotorFaults'][0]['TxErrorCount']}`);
  mapObj.set('motor1overspeederror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['MotorOverSpeed']}`);
  mapObj.set('motor1softwareovercurrenterror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['SoftwareOverCurrent']}`);
  mapObj.set('motor1dcbusovervoltageerror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['DcBusOverVoltage']}`);
  mapObj.set('motor1badmotorpositionhallsequenceerror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['BadMotorPositionHallSequence']}`);
  mapObj.set('motor1watchdogcausedlastreseterror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['WatchdogCausedLastReset']}`);
  mapObj.set('motor1configreaderrorerror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['ConfigReadError']}`);
  mapObj.set('motor1rail15vundervoltagelockouterror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['Rail15VUnderVoltageLockOut']}`);
  mapObj.set('motor1desaturationfaulterror',
    `${jsonObj['MotorFaults'][1]['ErrorFlags']['DesaturationFault']}`);
  mapObj.set('motor1outputvoltagepwmlimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['OutputVoltagePwm']}`);
  mapObj.set('motor1currentlimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['MotorCurrent']}`);
  mapObj.set('motor1velocitylimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['Velocity']}`);
  mapObj.set('motor1buscurrentlimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['BusCurrent']}`);
  mapObj.set('motor1busvoltageupperlimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['BusVoltageUpper']}`);
  mapObj.set('motor1busvoltagelowerlimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['BusVoltageLower']}`);
  mapObj.set('motor1ipmormotortemperaturelimit',
    `${jsonObj['MotorFaults'][1]['LimitFlags']['IpmOrMotorTemperature']}`);
  mapObj.set('motor1rxerrorcount',
    `${jsonObj['MotorFaults'][1]['RxErrorCount']}`);
  mapObj.set('motor1txerrorcount',
    `${jsonObj['MotorFaults'][1]['TxErrorCount']}`);
  mapObj.set('internalcommunicationfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['InternalCommunicationFault']}`);
  mapObj.set('internalconversionfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['InternalConversionFault']}`);
  mapObj.set('weakcellfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['WeakCellFault']}`);
  mapObj.set('lowcellvoltagefault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['LowCellVoltageFault']}`);
  mapObj.set('openwiringfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['OpenWiringFault']}`);
  mapObj.set('currentsensorfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['CurrentSensorFault']}`);
  mapObj.set('packvoltagesensorfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['PackVoltageSensorFault']}`);
  mapObj.set('weakpackfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['WeakPackFault']}`);
  mapObj.set('voltageredundancyfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['VoltageRedundancyFault']}`);
  mapObj.set('fanmonitorfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['FanMonitorFault']}`);
  mapObj.set('thermistorfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['ThermistorFault']}`);
  mapObj.set('canbuscommunicationsfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['CANBUSCommunicationsFault']}`);
  mapObj.set('alwaysonsupplyfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['AlwaysOnSupplyFault']}`);
  mapObj.set('highvoltageisolationfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['HighVoltageIsolationFault']}`);
  mapObj.set('twelvevpowersupplyfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['12vPowerSupplyFault']}`);
  mapObj.set('chargelimitenforcementfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['ChargeLimitEnforcementFault']}`);
  mapObj.set('dischargelimitenforcementfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['DischargeLimitEnforcementFault']}`);
  mapObj.set('chargersafetyrelayfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['ChargerSafetyRelayFault']}`);
  mapObj.set('internalmemoryfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['InternalMemoryFault']}`);
  mapObj.set('internalthermistorfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['InternalThermistorFault']}`);
  mapObj.set('internallogicfault',
    `${jsonObj['BatteryFaults']['ErrorFlags']['InternalLogicFault']}`);
  mapObj.set('dclreducedduetolowsoc',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowSoc']}`);
  mapObj.set('dclreducedduetohighcellresistance',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToHighCellResistance']}`);
  mapObj.set('dclreducedduetotemperature',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToTemperature']}`);
  mapObj.set('dclreducedduetolowcellvoltage',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowCellVoltage']}`);
  mapObj.set('dclreducedduetolowpackvoltage',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclReducedDueToLowPackVoltage']}`);
  mapObj.set('dclandcclreducedduetovoltagefailsafe',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclandCclReducedDueToVoltageFailsafe']}`);
  mapObj.set('dclandcclreducedduetocommunicationfailsafe',
    `${jsonObj['BatteryFaults']['LimitFlags']['DclandCclReducedDueToCommunicationFailsafe']}`);
  mapObj.set('cclreducedduetohighsoc',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighSoc']}`);
  mapObj.set('cclreducedduetohighcellresistance',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighCellResistance']}`);
  mapObj.set('cclreducedduetotemperature',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToTemperature']}`);
  mapObj.set('cclreducedduetohighcellvoltage',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighCellVoltage']}`);
  mapObj.set('cclreducedduetohighpackvoltage',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToHighPackVoltage']}`);
  mapObj.set('cclreducedduetochargerlatch',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToChargerLatch']}`);
  mapObj.set('cclreducedduetoalternatecurrentlimit',
    `${jsonObj['BatteryFaults']['LimitFlags']['CclReducedDueToAlternateCurrentLimit']}`);
  mapObj.set('batteryalive',
    `${jsonObj['Battery']['Alive']}`);
  mapObj.set('dischargerelayenabled',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['DischargeRelayEnabled']}`);
  mapObj.set('chargerelayenabled',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['ChargeRelayEnabled']}`);
  mapObj.set('chargersafetyenabled',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['ChargerSafetyEnabled']}`);
  mapObj.set('malfunctionindicatoractive',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['MalfunctionIndicatorActive']}`);
  mapObj.set('multipurposeinputsignalstatus',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['MultiPurposeInputSignalStatus']}`);
  mapObj.set('alwaysonsignalstatus',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['AlwaysOnSignalStatus']}`);
  mapObj.set('isreadysignalstatus',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['IsReadySignalStatus']}`);
  mapObj.set('ischargingsignalstatus',
    `${jsonObj['Battery']['BMSRelayStatusFlags']['IsChargingSignalStatus']}`);
  mapObj.set('populatedcells',
    `${jsonObj['Battery']['PopulatedCells']}`);
  mapObj.set('twelvevinputvoltage',
    `${jsonObj['Battery']['12vInputVoltage']}`);
  mapObj.set('fanvoltage',
    `${jsonObj['Battery']['FanVoltage']}`);
  mapObj.set('packcurrent',
    `${jsonObj['Battery']['PackCurrent']}`);
  mapObj.set('packvoltage',
    `${jsonObj['Battery']['PackVoltage']}`);
  mapObj.set('packstateofcharge',
    `${jsonObj['Battery']['PackStateOfCharge']}`);
  mapObj.set('packamphours',
    `${jsonObj['Battery']['PackAmphours']}`);
  mapObj.set('packdepthofdischarge',
    `${jsonObj['Battery']['PackDepthOfDischarge']}`);
  mapObj.set('hightemperature',
    `${jsonObj['Battery']['HighTemperature']}`);
  mapObj.set('highthermistorid',
    `${jsonObj['Battery']['HighThermistorId']}`);
  mapObj.set('lowtemperature',
    `${jsonObj['Battery']['LowTemperature']}`);
  mapObj.set('lowthermistorid',
    `${jsonObj['Battery']['LowThermistorId']}`);
  mapObj.set('averagetemperature',
    `${jsonObj['Battery']['AverageTemperature']}`);
  mapObj.set('internaltemperature',
    `${jsonObj['Battery']['InternalTemperature']}`);
  mapObj.set('fanspeed',
    `${jsonObj['Battery']['FanSpeed']}`);
  mapObj.set('requestedfanspeed',
    `${jsonObj['Battery']['RequestedFanSpeed']}`);
  mapObj.set('lowcellvoltage',
    `${jsonObj['Battery']['LowCellVoltage']}`);
  mapObj.set('lowcellvoltageid',
    `${jsonObj['Battery']['LowCellVoltageId']}`);
  mapObj.set('highcellvoltage',
    `${jsonObj['Battery']['HighCellVoltage']}`);
  mapObj.set('highcellvoltageid',
    `${jsonObj['Battery']['HighCellVoltageId']}`);
  mapObj.set('averagecellvoltage',
    `${jsonObj['Battery']['AverageCellVoltage']}`);
  // mapObj.set('prechargestate',
  //   `'${jsonObj['AuxBms']['PrechargeState']}'`);
  // ignore until test tool fixed
  mapObj.set('prechargestate',
    'Off');
  mapObj.set('auxvoltage',
    `${jsonObj['AuxBms']['AuxVoltage']}`);
  mapObj.set('auxbmsalive',
    `${jsonObj['AuxBms']['AuxBmsAlive']}`);
  mapObj.set('mppt0alive',
    `${jsonObj['MPPT'][0]['Alive']}`);
  mapObj.set('mppt0arrayvoltage',
    `${jsonObj['MPPT'][0]['ArrayVoltage']}`);
  mapObj.set('mppt0arraycurrent',
    `${jsonObj['MPPT'][0]['ArrayCurrent']}`);
  mapObj.set('mppt0batteryvoltage',
    `${jsonObj['MPPT'][0]['BatteryVoltage']}`);
  mapObj.set('mppt0temperature',
    `${jsonObj['MPPT'][0]['Temperature']}`);
  mapObj.set('mppt1alive',
    `${jsonObj['MPPT'][1]['Alive']}`);
  mapObj.set('mppt1arrayvoltage',
    `${jsonObj['MPPT'][1]['ArrayVoltage']}`);
  mapObj.set('mppt1arraycurrent',
    `${jsonObj['MPPT'][1]['ArrayCurrent']}`);
  mapObj.set('mppt1batteryvoltage',
    `${jsonObj['MPPT'][1]['BatteryVoltage']}`);
  mapObj.set('mppt1temperature',
    `${jsonObj['MPPT'][1]['Temperature']}`);
  mapObj.set('mppt2alive',
    `${jsonObj['MPPT'][2]['Alive']}`);
  mapObj.set('mppt2arrayvoltage',
    `${jsonObj['MPPT'][2]['ArrayVoltage']}`);
  mapObj.set('mppt2arraycurrent',
    `${jsonObj['MPPT'][2]['ArrayCurrent']}`);
  mapObj.set('mppt2batteryvoltage',
    `${jsonObj['MPPT'][2]['BatteryVoltage']}`);
  mapObj.set('mppt2temperature',
    `${jsonObj['MPPT'][2]['Temperature']}`);
  mapObj.set('lowbeams',
    `${jsonObj['Lights']['LowBeams']}`);
  mapObj.set('highbeams',
    `${jsonObj['Lights']['HighBeams']}`);
  mapObj.set('brakelights',
    `${jsonObj['Lights']['Brakes']}`);
  mapObj.set('leftsignal',
    `${jsonObj['Lights']['LeftSignal']}`);
  mapObj.set('rightsignal',
    `${jsonObj['Lights']['RightSignal']}`);
  mapObj.set('bmsstrobelight',
    `${jsonObj['Lights']['BmsStrobeLight']}`);
  mapObj.set('lightsalive',
    `${jsonObj['Lights']['Alive']}`);
  mapObj.set('strobebmslight',
    `${jsonObj['AuxBms']['StrobeBmsLight']}`);
  mapObj.set('allowcharge',
    `${jsonObj['AuxBms']['AllowCharge']}`);
  mapObj.set('contractorerror',
    `${jsonObj['AuxBms']['ContactorError']}`);
  mapObj.set('highvoltageenable',
    `${jsonObj['AuxBms']['HighVoltageEnable']}`);

  return mapObj;
}
