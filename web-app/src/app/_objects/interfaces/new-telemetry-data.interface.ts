export interface INewTelemetryData {
    PacketTitle: string,
    Timestamp: number,
    AuxBms: IAuxBms,
    KeyMotor: IKeyMotor[],
    MotorDetails: IMotorDetail[],
    DriverControls: IDriverControls,
    MotorFaults: IMotorFault[],
    BatteryFaults: IBatteryFault,
    Battery: IBattery,
    Ccs: ICcs,
    Mppt: IMPPT[]
    Lights: ILights,
}

export interface IAuxBms {
  AllowCharge: boolean,
  AllowDischarge: boolean,
  AuxBmsAlive: boolean,
  AuxVoltage: number,
  ChargeContactorError: boolean,
  ChargeOpenButShouldBeClosed: boolean,
  ChargeShouldTrip: boolean,
  ChargeTripDueToHighCellVoltage: boolean,
  ChargeTripDueToHighTemperatureAndCurrent: boolean,
  ChargeTripDueToPackCurrent: boolean,
  CommonContactorError: boolean,
  DischargeContactorError: boolean,
  DischargeOpenButShouldBeClosed: boolean,
  DischargeShouldTrip: boolean,
  DischargeTripDueToHighTemperatureAndCurrent: boolean,
  DischargeTripDueToLowCellVoltage: boolean,
  DischargeTripDueToPackCurrent: boolean,
  HighVoltageEnableState: boolean,
  OrionCANReceivedRecently: boolean,
  PrechargeState: string,
  ProtectionTrip: boolean,
  StrobeBmsLight: boolean
}

export interface IKeyMotor {
    Alive: boolean,
    SetCurrent: number,
    SetVelocity: number,
    BusCurrent: number,
    BusVoltage: number,
    VehicleVelocity: number
}

export interface IMotorDetail {
    PhaseCCurrent: number,
    PhaseBCurrent: number,
    MotorVoltageReal: number,
    MotorVoltageImaginary: number,
    MotorCurrentReal: number,
    MotorCurrentImaginary: number,
    BackEmf: number,
    VoltageRail15VSupply: number
    VoltageRail3VSupply: number,
    VoltageRail1VSupply: number,
    HeatSinkTemp: number,
    MotorTemp: number,
    DspBoardTemp: number,
    DcBusAmpHours: number,
    Odometer: number,
    SlipSpeed: number
}

export interface IDriverControls {
    Alive: boolean,
    HeadlightsOff: boolean,
    HeadlightsLow: boolean,
    HeadlightsHigh: boolean,
    SignalRight: boolean,
    SignalLeft: boolean,
    Hazard: boolean,
    Interior: boolean,
    Aux: boolean,
    VolumeUp: boolean,
    VolumeDown: boolean,
    NextSong: boolean,
    PrevSong: boolean,
    Acceleration: number,
    RegenBraking: number,
    Brakes: boolean,
    Forward: boolean,
    Reverse: boolean,
    PushToTalk: boolean,
    Horn: boolean,
    Reset: boolean
}

export interface ILights {
    LowBeams: boolean,
    HighBeams: boolean,
    Brakes: boolean,
    LeftSignal: boolean,
    RightSignal: boolean,
    BMSStrobeLight: boolean,
    Alive: boolean
}

export interface IBatteryFault {
    ErrorFlags: IBatteryErrorFlags,
    LimitFlags: IBatteryLimitFlags
}

export interface IBatteryErrorFlags {
    InternalCommunicationFault: boolean,
    InternalConversionFault: boolean,
    WeakCellFault: boolean,
    LowCellVoltageFault: boolean,
    OpenWiringFault: boolean,
    CurrentSensorFault: boolean,
    PackVoltageSensorFault: boolean,
    WeakPackFault: boolean,
    VoltageRedundancyFault: boolean,
    FanMonitorFault: boolean,
    thermistorFault: boolean,
    CANBUSCommunicationFault: boolean,
    AlwaysOnSupplyFault: boolean,
    HighVoltageIsolationFault: boolean,
    '12vPowerSupplyFault': boolean,
    ChargeLimitEnforcementFault: boolean,
    DischargeLimitEnforcementFault: boolean,
    ChargerSafetyRelayFault: boolean,
    InternalMemoryFault: boolean,
    InternalThermistorsFault: boolean,
    InternalLogicFault: boolean
}

export interface IBatteryLimitFlags {
    DclReducedDueToLowSoc: boolean,
    DclReducedDueToHighCellResistance: boolean,
    DclReducedDueToTemperature: boolean,
    DclReducedDueToLowCellVoltage: boolean,
    DclReducedDueToLowPackVoltage: boolean,
    DclAndCclReducedDueToVoltageFailsafe: boolean,
    DclAndCclReducedDueToCommunicationFailsafe: boolean,
    DclReducedDueToHighSoc: boolean,
    CclReducedDueToHighCellResistance: boolean,
    CclReducedDueToTemperature: boolean,
    CclReducedDueToHighCellVoltage: boolean,
    CclReducedDueToHighPackVoltage: boolean,
    CclReducedDueToChargerLatch: boolean,
    CclReducedDueToAlternateCurrentLimit: boolean
}

export interface ICcs {
  CcsAlive: boolean,
}

export interface IMPPT {
    Alive: boolean,
    ArrayVoltage: number,
    ArrayCurrent: number,
    BatteryVoltage: number,
    Temperature: number
}

export interface IMotorFault {
    ErrorFlags: IMotorErrorFlags,
    LimitFlags: IMotorLimitFlags,
    RxErrorCount: number,
    TxErrorCount: number
}

export interface IMotorErrorFlags{
    MotorOverSpeed: boolean,
    SoftwareOverCurrent: boolean,
    DcBusOverVoltage: boolean,
    BadMotorPositionHallSequence: boolean,
    WatchdogCausedLastReset: boolean,
    ConfigReadError: boolean,
    Wail15VUnderVoltageLockOut: boolean,
    DesaturationFault: boolean
}
export interface IMotorLimitFlags{
    OutputVoltagePwm: boolean,
    MotorCurrent: boolean,
    Velocity: boolean,
    BusCurrent: false,
    BusVoltageUpper: boolean,
    BusVoltageLower: boolean,
    IpmOrMotorTemperature: true
}

export interface IBattery {
    Alive: boolean,
    BMSRelayStatusFlags: IBMSRelayStatusFlags,
    PopulatedCells: number,
    "12vInputVoltage": number,
    FanVoltage: number,
    PackCurrent: number,
    PackVoltage: number,
    PackStateofCharge: number,
    PackAmphours: number,
    PackDepthofDischarge: number,
    HighTemperature: number,
    HighThermistorID: number,
    LowTemperature: number,
    LowTermistorID: number,
    AverageTemperature: number,
    InternalTemperature: number,
    FanSpeed: number,
    RequestedFanSpeed: number,
    LowCellVoltage: number,
    LowCellVoltageID: number,
    HighCellVoltage: number,
    HighCellVoltageID: number,
    AverageCellVoltage: number,
    PreChargeState: string,
    AuxVoltage: number,
    AuxBMSAlive: boolean
}

export interface IBMSRelayStatusFlags {
    DischargeRelayEnabled: boolean,
    ChargeRelayEnabled: boolean,
    ChargerSafetyEnabled: boolean,
    MalfunctionIndicatorActive: boolean,
    MultiPurposeInputSignalStatus: boolean,
    AlwaysOnSignalStatus: boolean,
    IsReadySignalStatus: boolean,
    IsChargingSignalStatus: boolean
}
