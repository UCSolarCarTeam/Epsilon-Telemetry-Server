export interface ITelemetryData {
  id: number,
  timestamp: string,
  name: string,
  motor0alive: boolean,
  motor0setcurrent: number,
  motor0setvelocity: number,
  motor0buscurrent: number,
  motor0busvoltage: number,
  motor0vehiclevelocity: number,
  motor0phaseccurrent: number,
  motor0phasebcurrent: number,
  motor0motorvoltagereal: number,
  motor0motorvoltageimaginary: number,
  motor0motorcurrentreal: number,
  motor0motorcurrentimaginary: number,
  motor0backemf: number,
  motor0voltagerail15vsupply: number,
  motor0voltagerail3vsupply: number,
  motor0voltagerail1vsupply: number,
  motor0heatsinktemp: number,
  motor0motortemp: number,
  motor0dspboardtemp: number,
  motor0dcbusamphours: number,
  motor0odometer: number,
  motor0slipspeed: number,
  motor1alive: boolean,
  motor1setcurrent: number,
  motor1setvelocity: number,
  motor1buscurrent: number,
  motor1busvoltage: number,
  motor1vehiclevelocity: number,
  motor1phaseccurrent: number,
  motor1phasebcurrent: number,
  motor1motorvoltagereal: number,
  motor1motorvoltageimaginary: number,
  motor1motorcurrentreal: number,
  motor1motorcurrentimaginary: number,
  motor1backemf: number,
  motor1voltagerail15vsupply: number,
  motor1voltagerail3vsupply: number,
  motor1voltagerail1vsupply: number,
  motor1heatsinktemp: number,
  motor1motortemp: number,
  motor1dspboardtemp: number,
  motor1dcbusamphours: number,
  motor1odometer: number,
  motor1slipspeed: number,
  drivercontrolsalive: boolean,
  headlightsoff: boolean,
  headlightslow: boolean,
  headlightshigh: boolean,
  signalright: boolean,
  signalleft: boolean,
  hazard: boolean,
  interior: boolean,
  aux: boolean,
  volumeup: boolean,
  volumedown: boolean,
  nextsong: boolean,
  prevsong: boolean,
  acceleration: number,
  regenbraking: number,
  brakes: boolean,
  controlsforward: boolean,
  controlsreverse: boolean,
  pushtotalk: boolean,
  horn: boolean,
  controlsmotorreset: boolean,
  motor0overspeederror: boolean,
  motor0softwareovercurrenterror: boolean,
  motor0dcbusovervoltageerror: boolean,
  motor0badmotorpositionhallsequenceerror: boolean,
  motor0watchdogcausedlastreseterror: boolean,
  motor0configreaderrorerror: boolean,
  motor0rail15vundervoltagelockouterror: boolean,
  motor0desaturationfaulterror: boolean,
  motor0outputvoltagepwmlimit: boolean,
  motor0currentlimit: boolean,
  motor0velocitylimit: boolean,
  motor0buscurrentlimit: boolean,
  motor0busvoltageupperlimit: boolean,
  motor0busvoltagelowerlimit: boolean,
  motor0ipmormotortemperaturelimit: boolean,
  motor0rxerrorcount: number,
  motor0txerrorcount: number,
  motor1overspeederror: boolean,
  motor1softwareovercurrenterror: boolean,
  motor1dcbusovervoltageerror: boolean,
  motor1badmotorpositionhallsequenceerror: boolean,
  motor1watchdogcausedlastreseterror: boolean,
  motor1configreaderrorerror: boolean,
  motor1rail15vundervoltagelockouterror: boolean,
  motor1desaturationfaulterror: boolean,
  motor1outputvoltagepwmlimit: boolean,
  motor1currentlimit: boolean,
  motor1velocitylimit: boolean,
  motor1buscurrentlimit: boolean,
  motor1busvoltageupperlimit: boolean,
  motor1busvoltagelowerlimit: boolean,
  motor1ipmormotortemperaturelimit: boolean,
  motor1rxerrorcount: number,
  motor1txerrorcount: number,
  internalcommunicationfault: boolean,
  internalconversionfault: boolean,
  weakcellfault: boolean,
  lowcellvoltagefault: boolean,
  openwiringfault: boolean,
  currentsensorfault: boolean,
  packvoltagesensorfault: boolean,
  weakpackfault: boolean,
  voltageredundancyfault: boolean,
  fanmonitorfault: boolean,
  thermistorfault: boolean,
  canbuscommunicationsfault: boolean,
  alwaysonsupplyfault: boolean,
  highvoltageisolationfault: boolean,
  twelvevpowersupplyfault: boolean,
  chargelimitenforcementfault: boolean,
  dischargelimitenforcementfault: boolean,
  chargersafetyrelayfault: boolean,
  internalmemoryfault: boolean,
  internalthermistorfault: boolean,
  internallogicfault: boolean,
  dclreducedduetolowsoc: boolean,
  dclreducedduetohighcellresistance: boolean,
  dclreducedduetotemperature: boolean,
  dclreducedduetolowcellvoltage: boolean,
  dclreducedduetolowpackvoltage: boolean,
  dclandcclreducedduetovoltagefailsafe: boolean,
  dclandcclreducedduetocommunicationfailsafe: boolean,
  cclreducedduetohighsoc: boolean,
  cclreducedduetohighcellresistance: boolean,
  cclreducedduetotemperature: boolean,
  cclreducedduetohighcellvoltage: boolean,
  cclreducedduetohighpackvoltage: boolean,
  cclreducedduetochargerlatch: boolean,
  cclreducedduetoalternatecurrentlimit: boolean,
  batteryalive: boolean,
  dischargerelayenabled: boolean,
  chargerelayenabled: boolean,
  chargersafetyenabled: boolean,
  malfunctionindicatoractive: boolean,
  multipurposeinputsignalstatus: boolean,
  alwaysonsignalstatus: boolean,
  isreadysignalstatus: boolean,
  ischargingsignalstatus: boolean,
  populatedcells: number,
  twelvevinputvoltage: number,
  fanvoltage: number,
  packcurrent: number,
  packvoltage: number,
  packstateofcharge: number,
  packamphours: number,
  packdepthofdischarge: number,
  hightemperature: number,
  highthermistorid: number,
  lowtemperature: number,
  lowthermistorid: number,
  averagetemperature: number,
  internaltemperature: number,
  fanspeed: number,
  requestedfanspeed: number,
  lowcellvoltage: number,
  lowcellvoltageid: number,
  highcellvoltage: number,
  highcellvoltageid: number,
  averagecellvoltage: number,
  prechargestate: string,
  auxvoltage: number,
  auxbmsalive: boolean,
  mppt0alive: boolean,
  mppt0arrayvoltage: number,
  mppt0arraycurrent: number,
  mppt0batteryvoltage: number,
  mppt0temperature: number,
  mppt1alive: boolean,
  mppt1arrayvoltage: number,
  mppt1arraycurrent: number,
  mppt1batteryvoltage: number,
  mppt1temperature: number,
  mppt2alive: boolean,
  mppt2arrayvoltage: number,
  mppt2arraycurrent: number,
  mppt2batteryvoltage: number,
  mppt2temperature: number,
  lowbeams: boolean,
  highbeams: boolean,
  brakelights: boolean,
  leftsignal: boolean,
  rightsignal: boolean,
  bmsstrobelight: boolean,
  lightsalive: boolean,
  strobebmslight: boolean,
  allowcharge: boolean,
  contractorerror: boolean,
  highvoltageenable: boolean,
  lap: boolean
}
