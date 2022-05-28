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

  public downloadedPacketText: string = '';
  public packets: INewTelemetryData[];

  public startTime: Date = new Date();
  public endTime:Date = new Date();

  public showTimeStamp: boolean = true;
  public showPacketTitle: boolean = true;
  public showAuxBms: boolean = false;
  public showKeyMotor: boolean = false;
  public showMotorDetails: boolean = false;
  public showDriverControls: boolean = false;
  public showMotorFaults: boolean = true;
  public showBatteryFaults: boolean = true;
  public showBattery: boolean = false;
  public showCcs: boolean = false;
  public showMppt: boolean = false;
  public showLights: boolean = false;

  public test: number = 0;

  constructor(private apiService: ApiHttpService, private formBuilder: FormBuilder) {
    this.findPacketsForm = this.formBuilder.group({
      startTime: ['2022-04-30T15:42'],
      endTime: ['2022-04-30T15:42'],
    });
  }

  onPacketDownloadButton() {
    this.startTime= new Date(this.findPacketsForm.get('startTime').value);
    this.endTime= new Date(this.findPacketsForm.get('endTime').value);

    this.apiService.get(`getPackets?startTime=${this.startTime.getTime()}&endTime=${this.endTime.getTime()}`)
    .subscribe((result: INewTelemetryData[]) => {
        this.downloadedPacketText = JSON.stringify(result);
        this.packets = result;
    });
  }

  getTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString();
  }
}
