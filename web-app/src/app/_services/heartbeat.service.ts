import { Injectable, EventEmitter} from '@angular/core';
import { Packet } from '../_objects/packet';
import { PacketService } from './packet.service';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {

  heartbeat$: EventEmitter<Boolean>;
  packet: Packet;
  interval: number;

  constructor(private packetService: PacketService) {
      this.packet = this.packetService.getData();
      this.interval = 5000;
      this.packetService.packet$.subscribe(
        (data: Packet) => {
          this.packet = data;
        }
      );

    this.heartbeat$ = new EventEmitter<Boolean>();
    setInterval(() => {
        this.heartbeatCheck()
    }, this.interval)
  }

   heartbeatCheck() {
    const packetTime = new Date(this.packet.timestamp);
    if (Date.now() - this.packet.timestamp > this.interval) {
        this.heartbeat$.emit(false);
    } else {
        this.heartbeat$.emit(true);
    }
   }
}
