import { Component, OnInit } from '@angular/core';
import { Packet } from '../_objects/packet';
import { PacketService } from '../_services/packet.service';
import { HeartbeatService } from '../_services/heartbeat.service';

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.css']
})
export class TimestampComponent implements OnInit {
  packet: Packet;
  heartbeat: Boolean;

  constructor(private packetService: PacketService, private heartbeatService: HeartbeatService) {
}

  ngOnInit() {
    this.packet = this.packetService.getData();
    this.packetService.packet$.subscribe(
      (data: Packet) => {
        this.packet = data;
        this.heartbeat = true;
      }
    );
    this.heartbeatService.heartbeat$.subscribe(
      (heartbeat: Boolean) => {
        this.heartbeat = heartbeat;
      }
    )
  }
}
