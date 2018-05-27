import { Injectable, EventEmitter } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { Packet } from '../_objects/packet';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';

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
        this.packet.timestamp = new Date(data.timestamp).toTimeString();
        this.packet.name = data.name;
        this.packet$.emit(this.getData());
      }
    );
  }

  getData(): Packet {
    return this.packet;
  }
}
