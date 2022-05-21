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

  public test: number = 0;

  constructor(private apiService: ApiHttpService) { }

  onPacketDownloadButton() {
    this.apiService.get(`http://localhost:3000/api/getPackets?startTime=${this.startTime}&endTime=${this.endTime}`)
    .subscribe((result: INewTelemetryData[]) => {
        this.downloadedPacketText = JSON.stringify(result);
        this.packets = result;
    });
  }

  getTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString();
  }
}
