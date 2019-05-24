import { Injectable, EventEmitter} from '@angular/core';
import { Packet } from '../_objects/packet';
import { PacketService } from './packet.service';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {

  heartBeat$: EventEmitter<Boolean>;
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

    this.heartBeat$ = new EventEmitter<Boolean>();
    setInterval(() => {
        this.heartBeatCheck()
    }, this.interval)
  }

   heartBeatCheck() {
    const packetTime = Date.parse(this.packet.timestamp);

    if (Number.isNaN(packetTime) || Date.now() - packetTime > this.interval) {
        this.heartBeat$.emit(false);
    } else {
        this.heartBeat$.emit(true);
    }
   }
}
