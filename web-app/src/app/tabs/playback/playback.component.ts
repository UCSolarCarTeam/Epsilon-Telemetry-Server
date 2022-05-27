import { Component } from '@angular/core';
import { INewTelemetryData } from 'app/_objects/interfaces/new-telemetry-data.interface';
import { ApiHttpService } from 'app/_services/api-http.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})

export class PlaybackComponent {

  public downloadedPacketText: string = '';
  public packets: INewTelemetryData[];

  public startTime: number = 1651354920000;
  public endTime:number = 1651354920000;

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

  constructor(private apiService: ApiHttpService) { }

  onPacketDownloadButton() {
    this.apiService.get(`getPackets?startTime=${this.startTime}&endTime=${this.endTime}`)
    .subscribe((result: INewTelemetryData[]) => {
        this.downloadedPacketText = JSON.stringify(result);
        this.packets = result;
    });
  }

  getTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString();
  }
}
