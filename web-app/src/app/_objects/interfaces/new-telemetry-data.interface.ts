export interface INewTelemetryData {
    packetTitle: string,
    timestamp: number,
    keyMotor: IKeyMotor[],
    motorDetails: IMotorDetail[],
    driverControls: IDriverControls,
    motorFaults: IMotorFault[],
    batteryFaults: IBatteryFault,
    battery: IBattery,
    mppt: IMPPT[]
    lights: ILights,
}

export interface IKeyMotor {
    alive: boolean,
    setCurrent: number,
    setVelocity: number,
    busCurrent: number,
    busVoltage: number,
    vehicleVoltage: number
}

export interface IMotorDetail {
    phaseCCurrent: number,
    phaseBCurrent: number,
    motorVoltageReal: number,
    motorVoltageImaginary: number,
    motorCurrentReal: number,
    motorCurrentImaginary: number,
    backEmfReal: number,
    backEmfImaginary: number,
    voltageRail15VSupply: number
    voltageRail3VSupply: number,
    voltageRail1VSupply: number,
    heatSinkTemp: number,
    motorTemp: number,
    dspBoardTemp: number,
    dcBusAmpHours: number,
    odometer: number,
    slipSpeed: number
}

export interface IDriverControls {
    alive: boolean,
    headlightsOff: boolean,
    headlightsLow: boolean,
    headlightsHigh: boolean,
    signalRight: boolean,
    signalLeft: boolean,
    hazard: boolean,
    interior: boolean,
    aux: boolean,
    volumeUp: boolean,
    volumeDown: boolean,
    nextSong: boolean,
    prevSong: boolean,
    acceleration: number,
    regenBraking: number,
    brakes: boolean,
    forward: boolean,
    reverse: boolean,
    pushToTalk: boolean,
    horn: boolean,
    reset: boolean
}

export interface ILights {
    lowBeams: boolean,
    highBeams: boolean,
    brakes: boolean,
    leftSignal: boolean,
    rightSignal: boolean,
    BMSStrobeLight: boolean,
    lightAlive: boolean
}

export interface IBatteryFault {
    errorFlags: IBatteryErrorFlags,
    limitFlags: IBatteryLimitFlags
}

export interface IBatteryErrorFlags {
    internalCommunicationFault: boolean,
    internalConversionFault: boolean,
    weakCellFault: boolean,
    lowCellVoltageFault: boolean,
    openWiringFault: boolean,
    currentSensorFault: boolean,
    packVoltageSensorFault: boolean,
    weakPackFault: boolean,
    voltageRedundancyFault: boolean,
    fanMonitorFault: boolean,
    thermistorFault: boolean,
    CANBUSCommunicationFault: boolean,
    alwaysOnSupplyFault: boolean,
    highVoltageIsolationFault: boolean,
    powerSupply12VFault: boolean,
    chargeLimitEnforcementFault: boolean,
    dischargeLimitEnforcementFault: boolean,
    chargerSafetyRelayFault: boolean,
    internalMemoryFault: boolean,
    internalThermistorsFault: boolean,
    internalLogicFault: boolean
}

export interface IBatteryLimitFlags {
    dclReducedDueToLowSoc: boolean,
    dclReducedDueToHighCellResistance: boolean,
    dclReducedDueToTemperature: boolean,
    dclReducedDueToLowCellVoltage: boolean,
    dclReducedDueToLowPackVoltage: boolean,
    dclAndCclReducedDueToVoltageFailsafe: boolean,
    dclAndCclReducedDueToCommunicationFailsafe: boolean,
    cclReducedDueToHighSoc: boolean,
    cclReducedDueToHighCellResistance: boolean,
    cclReducedDueToTemperature: boolean,
    cclReducedDueToHighCellVoltage: boolean,
    cclReducedDueToHighPackVoltage: boolean,
    cclReducedDueToChargerLatch: boolean,
    cclReducedDueToAlternateCurrentLimit: boolean
}

export interface IMPPT {
    alive: boolean,
    arrayVoltage: number,
    arrayCurrent: number,
    batteryVoltage: number,
    temperature: number
}

export interface IMotorFault {
    errorFlags: IMotorErrorFlags,
    limitFlags: IMotorLimitFlags,
    rxErrorCount: number,
    txErrorCount: number
}

export interface IMotorErrorFlags{
    motorOverSpeed: boolean,
    softwareOverCurrent: boolean,
    dcBusOverVoltage: boolean,
    badMotorPositionHallSequence: boolean,
    watchdogCausedLastReset: boolean,
    configReadError: boolean,
    rail15VUnderVoltageLockOut: boolean,
    desaturationFault: boolean
}
export interface IMotorLimitFlags{
    outputVoltagePwm: boolean,
    motorCurrent: boolean,
    velocity: boolean,
    busCurrent: false,
    busVoltageUpper: boolean,
    busVoltageLower: boolean,
    ipmOrMotorTemperature: true
}

export interface IBattery {
    alive: boolean,
    BMSRelayStatusFlags: IBMSRelayStatusFlags,
    populatedCells: number,
    inputVoltage12V: number,
    fanVoltage: number,
    packCurrent: number,
    packVoltage: number,
    packStateofCharge: number,
    packAmphours: number,
    packDepthofDischarge: number,
    highTemperature: number,
    highThermistorID: number,
    lowTemperature: number,
    lowTermistorID: number,
    averageTemperature: number,
    internalTemperature: number,
    fanSpeed: number,
    requestedFanSpeed: number,
    lowCellVoltage: number,
    lowCellVoltageID: number,
    highCellVoltage: number,
    highCellVoltageID: number,
    averageCellVoltage: number,
    preChargeState: string,
    auxVoltage: number,
    auxBMSAlive: boolean
}

export interface IBMSRelayStatusFlags {
    dischargeRelayEnabled: boolean,
    chargeRelayEnabled: boolean,
    chargerSafetyEnabled: boolean,
    malfunctionIndicatorActive: boolean,
    multiPurposeInputSignalStatus: boolean,
    alwaysOnSignalStatus: boolean,
    isReadySignalStatus: boolean,
    isChargingSignalStatus: boolean
}