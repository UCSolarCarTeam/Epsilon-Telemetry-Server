import { Injectable, EventEmitter } from '@angular/core';

import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
import { Packet } from '../_objects/packet';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  packet$: EventEmitter<Packet>;

  private packet: Packet;

  constructor(private wsService: WebSocketService) {
    this.packet$ = new EventEmitter<Packet>();
    this.packet = new Packet;

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.packet$.emit(this.getData());
        this.packet.name = data.name;
        this.packet.timestamp = new Date(data.timestamp);
      }
    );
  }

  getData(): Packet {
    return this.packet;
  }
}
