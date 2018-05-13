import { Component, OnInit } from '@angular/core';

import { CarMisc } from '../car-misc';
import { BatteryMisc } from '../battery-misc';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  carMisc: CarMisc = {
    directionForward: false,
    directionReverse: true,
    brakes: false,
    hazard: true,
    regenBraking: 30,
    acceleration: 40,
    setCurrent: 50,
    busCurrent: 20,
    busVoltage: 10,
    setVelocity: 140,
    vehicleVelocity: 80,
    totalArrayPower: 65,
    bmsStrobeLight: true
  };


  constructor() { }

  ngOnInit() {
  }

}
