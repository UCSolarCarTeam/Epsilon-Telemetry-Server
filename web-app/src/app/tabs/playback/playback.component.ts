import { Component } from '@angular/core';
import { INewTelemetryData } from 'app/_objects/interfaces/new-telemetry-data.interface';
import { ApiHttpService } from 'app/_services/api-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})

export class PlaybackComponent {
  findPacketsForm: FormGroup;

  public page = 1;
  public downloadedPacketText = '';
  public packets: INewTelemetryData[];

  public startTime: Date = new Date();
  public endTime: Date = new Date();

  public showTimeStamp = true;
  public showPacketTitle = true;
  public showAuxBms = false;
  public showKeyMotor = false;
  public showMotorDetails = false;
  public showDriverControls = false;
  public showMotorFaults = true;
  public showBatteryFaults = true;
  public showBattery = false;
  public showCcs = false;
  public showMppt = false;
  public showLights = false;

  constructor(private apiService: ApiHttpService, private formBuilder: FormBuilder) {
    this.findPacketsForm = this.formBuilder.group({
      startTime: ['2022-04-30T15:42'],
      endTime: ['2022-04-30T15:42'],
    });
  }

  onPacketDownloadButton() {
    this.startTime = new Date(this.findPacketsForm.get('startTime').value);
    this.endTime = new Date(this.findPacketsForm.get('endTime').value);

    this.apiService.get(
      `getPackets?startTime=${this.startTime.getTime()}&endTime=${this.endTime.getTime()}&page=${this.page}`)
      .subscribe((result: INewTelemetryData[]) => {
        this.downloadedPacketText = JSON.stringify(result);
        this.packets = result;
      });
  }

  previousPage() {
    this.page--;
    this.onPacketDownloadButton();
  }

  nextPage() {
    this.page++;
    this.onPacketDownloadButton();
  }

  getTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString();
  }

  getPropertyStyling(property: string, value) {
    switch (property) {
      case 'AuxBms.AuxBmsAlive':
      case 'DriverControls.Alive':
      case 'Ccs.Alive':
      case 'Mppt.Alive':
      case 'Battery.Alive':
        if (!value) {
          return 'red';
        }
        break;
      case 'AuxBms.AuxVoltage':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'AuxBms.ChargeContactorError':
      case 'AuxBms.ChargeOpenButShouldBeClosed':
      case 'AuxBms.ChargeTripDueToHighCellVoltage':
      case 'AuxBms.ChargeTripDueToHighTemperatureAndCurrent':
      case 'AuxBms.ChargeTripDueToPackCurrent':
      case 'AuxBms.CommonContactorError':
      case 'AuxBms.DischargeOpenButShouldBeClosed':
      case 'AuxBms.DischargeTripDueToHighTemperatureAndCurrent':
      case 'AuxBms.DischargeTripDueToLowCellVoltage':
      case 'AuxBms.DischargeTripDueToPackCurrent':
      case 'AuxBms.ProtectionTrip':
        if (value) {
          return 'red';
        }
        break;
      case 'KeyMotor.BusCurrent':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'KeyMotor.BusVoltage':
        if (value > 130 || value < 78) {
          return 'red';
        }
        break;
      // case 'MotorDetails.PhaseCCurrent':
      //   if (value > 12.5 || value < 11.5) {
      //     return 'red';
      //   }
      //   break;
      // case 'MotorDetails.PhaseBCurrent':
      //   if (value > 12.5 || value < 11.5) {
      //     return 'red';
      //   }
      //   break;
      // case 'MotorDetails.MotorCurrentReal':
      //   if (value > 100 || value < -48) {
      //     return 'red';
      //   }
      case 'MotorDetails.VoltageRail15VSupply':
        if (value > 16 || value < 14) {
          return 'red';
        }
        break;
      case 'MotorDetails.VoltageRail3VSupply':
        if (value > 4 || value < 2) {
          return 'red';
        }
        break;
      case 'MotorDetails.VoltageRail1VSupply':
        if (value > 2 || value < 0.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.HeatSinkTemp':
        if (value > 90 || value < 15) {
          return 'red';
        }
        break;
      case 'MotorDetails.MotorTemp':
        if (value > 90 || value < 15) {
          return 'red';
        }
        break;
      case 'MotorDetails.DspBoardTemp':
        if (value > 90 || value < 15) {
          return 'red';
        }
        break;
      case 'MotorDetails.DcBusAmpHours':
        if (value < 0) {
          return 'red';
        }
        break;
      case 'MotorFauls.ErrorFlags.MotorOverSpeed':
      case 'MotorFauls.ErrorFlags.SoftwareOverCurrent':
      case 'MotorFauls.ErrorFlags.DcBusOverVoltage':
      case 'MotorFauls.ErrorFlags.BadMotorPositionHallSequence':
      case 'MotorFauls.ErrorFlags.WatchdogCausedLastReset':
      case 'MotorFauls.ErrorFlags.ConfigReadError':
      case 'MotorFauls.ErrorFlags.Wail15VUnderVoltageLockOut':
      case 'MotorFauls.ErrorFlags.DesaturationFault':
      case 'BatteryFaults.ErrorFlags.InternalCommunicationFault':
      case 'BatteryFaults.ErrorFlags.InternalConversionFault':
      case 'BatteryFaults.ErrorFlags.WeakCellFault':
      case 'BatteryFaults.ErrorFlags.LowCellVoltageFault':
      case 'BatteryFaults.ErrorFlags.OpenWiringFault':
      case 'BatteryFaults.ErrorFlags.CurrentSensorFault':
      case 'BatteryFaults.ErrorFlags.PackVoltageSensorFault':
      case 'BatteryFaults.ErrorFlags.WeakPackFault':
      case 'BatteryFaults.ErrorFlags.VoltageRedundancyFault':
      case 'BatteryFaults.ErrorFlags.FanMonitorFault':
      case 'BatteryFaults.ErrorFlags.ThermistorFault':
      case 'BatteryFaults.ErrorFlags.CANBUSCommunicationFault':
      case 'BatteryFaults.ErrorFlags.AlwaysOnSupplyFault':
      case 'BatteryFaults.ErrorFlags.HighVoltageIsolationFault':
      case 'BatteryFaults.ErrorFlags.12vPowerSupplyFault':
      case 'BatteryFaults.ErrorFlags.ChargeLimitEnforcementFault':
      case 'BatteryFaults.ErrorFlags.DischargeLimitEnforcementFault':
      case 'BatteryFaults.ErrorFlags.ChargerSafetyRelayFault':
      case 'BatteryFaults.ErrorFlags.InternalMemoryFault':
      case 'BatteryFaults.ErrorFlags.InternalThermistorsFault':
      case 'BatteryFaults.ErrorFlags.InternalLogicFault':
        if (value !== undefined && value) {
          return 'red';
        }
        break;
      case 'Mppt.ArrayVoltage':
        if (value > 120 || value < 15) {
          return 'red';
        }
        break;
      case 'Mppt.ArrayCurrent':
        if (value > 50 || value < 0) {
          return 'red';
        }
        break;
      case 'Mppt.BatteryVoltage':
        if (value > 130 || value < 78) {
          return 'red';
        }
        break;
      case 'Mppt.Temperature':
        if (value > 60 || value < 20) {
          return 'red';
        }
        break;
      case 'Battery.TwelveVoltInputVoltage':
        if (value > 13 || value < 11) {
          return 'red';
        }
        break;
      case 'Battery.PackCurrent':
        if (value > 230 || value < -50) {
          return 'red';
        }
        break;
      case 'Battery.PackVoltage':
        if (value > 125 || value < 78) {
          return 'red';
        }
        break;
      case 'Battery.HighTemperature':
        if (value > 60 || value < 20) {
          return 'red';
        }
        break;
      case 'Battery.LowTemperature':
        if (value > 50 || value < 10) {
          return 'red';
        }
        break;
      case 'Battery.AverageTemperature':
        if (value > 55 || value < 15) {
          return 'red';
        }
        break;
      case 'Battery.InternalTemperature':
        if (value > 60 || value < 15) {
          return 'red';
        }
        break;
      case 'Battery.LowCellVoltage':
        if (value > 4100 || value < 3900) {
          return 'red';
        }
        break;
      case 'Battery.HighCellVoltage':
        if (value > 4100 || value < 3900) {
          return 'red';
        }
        break;
      case 'Battery.AverageCellVoltage':
        if (value > 4100 || value < 3900) {
          return 'red';
        }
        break;
    }
    return 'white';
  }
}
