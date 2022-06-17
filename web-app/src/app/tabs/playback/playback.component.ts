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
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.PhaseCCurrent':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.PhaseBCurrent':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.MotorVoltageImaginary':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.MotorCurrentReal':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.MotorCurrentImaginary':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.BackEmf':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.VoltageRail15VSupply':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.VoltageRail3VSupply':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.VoltageRail1VSupply':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.HeatSinkTemp':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.MotorTemp':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.DspBoardTemp':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
      case 'MotorDetails.DcBusAmpHours':
        if (value > 12.5 || value < 11.5) {
          return 'red';
        }
        break;
    }
    return 'white';
  }
}
