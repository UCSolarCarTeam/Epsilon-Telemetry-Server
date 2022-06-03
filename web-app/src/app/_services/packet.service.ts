import { Injectable, EventEmitter } from '@angular/core';

import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
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

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.packet.name = data.PacketTitle;
        this.packet.timestamp = data.TimeStamp;
        this.packet$.emit(this.getData());
      }
    );
  }

  getData(): Packet {
    return this.packet;
  }
}
