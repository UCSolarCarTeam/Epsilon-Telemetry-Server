import { Component } from '@angular/core';
import { ApiHttpService } from 'app/_services/api-http.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})
export class PlaybackComponent {

  private downloadedPacketText: string = '';

  constructor(private apiService: ApiHttpService) { }

  onPacketDownloadButton() {
    this.apiService.get('http://localhost:3000/api/test').subscribe((result) => {
        this.downloadedPacketText = JSON.stringify(result);
    });
  }
}
