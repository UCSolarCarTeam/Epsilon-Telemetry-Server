import { Injectable } from '@angular/core';

import { ITelemetryData } from './_objects/interfaces/telemetry-data.interface';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket$: WebSocketSubject<any>;

  packetMultiplex$: Observable<any>;
  lapMultiplex$: Observable<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:4000');
    this.packetMultiplex$ = this.socket$.multiplex(
         () => ({subscribe: ''}),
         () => ({unsubscribe: ''}),
         message => (message.msgType === 'packet') // Messages will go through if this passes
        )
    this.lapMultiplex$ = this.socket$.multiplex(
         () => ({subscribe: ''}),
         () => ({unsubscribe: ''}),
         message => (message.msgType === 'lap')
        )
  }
}
