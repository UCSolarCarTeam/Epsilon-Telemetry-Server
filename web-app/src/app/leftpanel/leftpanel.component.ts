import { Component, OnInit } from '@angular/core';

import { Packet } from '../_objects/packet';
import { PacketService } from '../_services/packet.service';
import { HeartbeatService } from '../_services/heartbeat.service';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  // declare empty public variable
  packet: Packet;

  heartBeat: Boolean;
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
        this.heartBeat = true;
        this.timestamp  = new Date(Number(this.packet.timestamp))
      }
    );
    this.heartbeatService.heartBeat$.subscribe(
        (heartBeat: Boolean) => {
            this.heartBeat = heartBeat;
        })
  }
}
