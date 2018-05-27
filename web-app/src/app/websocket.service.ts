import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ITelemetryData } from './_objects/interfaces/telemetry-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket$: WebSocketSubject<ITelemetryData>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:4000');
  }
}
