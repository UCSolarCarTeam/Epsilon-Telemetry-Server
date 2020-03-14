import { Component, OnInit } from '@angular/core';

import { Packet } from '../_objects/packet';
import { PacketService } from '../_services/packet.service';
import { HeartbeatService } from '../_services/heartbeat.service';

import { TimestampComponent } from '../timestamp/timestamp.component';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  // declare empty public variable
  packet: Packet;

  heartbeat: Boolean;
  timestamp: Date;
  // inject the PacketService
  constructor(private packetService: PacketService, private heartbeatService: HeartbeatService) {
  }

  ngOnInit() {
    // initialize with default values
    this.packet = this.packetService.getData();
    this.timestamp = new Date(Number(this.packet.timestamp))
    this.packetService.packet$.subscribe(
      (data: Packet) => {
        this.packet = data;
        this.heartbeat = true;
        this.timestamp  = new Date(Number(this.packet.timestamp))
      }
    );
    this.heartbeatService.heartbeat$.subscribe(
        (heartbeat: Boolean) => {
            this.heartbeat = heartbeat;
        })
  }
}
