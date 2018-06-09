import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})

export class BatteryComponent implements OnInit {
	packCurrent = 0;
	packVoltage = 0;
	packAmphours = 0;
	packStateOfCharge = 0;
	packDepthOfCharge = 0;
	highTemperature = 50;
	lowTemperature  = 50;
	highThermistorId = 50;
	lowThermistorId = 50;
	internalTemperature = 50;
	averageCellVoltage = 0;
	lowCellVoltage = 0;
	highCellVoltage = 0;
	populatedCells = 0;
	lowCellVoltageId = 0;
	highCellVoltageId = 0;
	fanVoltage = 0;
	fanSpeed = 0;
	requestedFanSpeed = 0;
	prechargeState = 0;
	auxBMSAlive = false;
	auxVoltage = 0;
	orionBMSInputVoltage = 0;
	strobeBMS = false;
	contactorError = false;
	allowCharge = false;


  constructor() { }

  ngOnInit() {
  }

}
