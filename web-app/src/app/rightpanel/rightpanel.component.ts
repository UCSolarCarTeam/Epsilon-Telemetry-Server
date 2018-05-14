import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc } from '../battery-misc';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  private carMisc = new CarMisc(false, true, false, true,
                                30, 40, 50, 20, 10, 140,
                                80, 65, true);

  constructor() { }

  ngOnInit() {
  }
}
