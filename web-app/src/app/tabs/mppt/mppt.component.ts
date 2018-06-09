import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mppt',
  templateUrl: './mppt.component.html',
  styleUrls: ['./mppt.component.css']
})
export class MpptComponent implements OnInit {

	mppt0ArrayVoltage = 0;
	mppt0ArrayCurrent = 0;
	mppt0BatteryVoltage = 0;
	mppt0Temperature = 0;

	mppt1ArrayVoltage = 0;
	mppt1ArrayCurrent = 0;
	mppt1BatteryVoltage = 0;
	mppt1Temperature = 0;

	mppt2ArrayVoltage = 0;
	mppt2ArrayCurrent = 0;
	mppt2BatteryVoltage = 0;
	mppt2Temperature = 0;



  constructor() { }

  ngOnInit() {
  }

}
