import { Component } from '@angular/core';
import { INewTelemetryData } from 'app/_objects/interfaces/new-telemetry-data.interface';
import { ApiHttpService } from 'app/_services/api-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  public showTable = false;

  constructor(private apiService: ApiHttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.findPacketsForm = this.formBuilder.group({
      startTime: [environment.production ? '' : '2022-04-30T15:42'],
      endTime: [environment.production ? '' : '2022-04-30T15:42'],
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
        this.showTable = true;
        this.openSnackBar('Loaded data', 'Dismiss', 'mat-accent');
    }, (err) => {
      this.openSnackBar('Error Loading Data', 'Dismiss', 'mat-warn');
      console.log(err);
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

  openSnackBar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', type]
    });
  }
}
