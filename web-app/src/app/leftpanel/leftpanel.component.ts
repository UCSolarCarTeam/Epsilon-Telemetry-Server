import { Component, OnInit } from '@angular/core';

import { Packet } from '../packet';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  packet: Packet = {
    timestamp: "1988-Jul-18-04-07-13-199"
  };

  constructor() { }

  ngOnInit() {
  }

}
