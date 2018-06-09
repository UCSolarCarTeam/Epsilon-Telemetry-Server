import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
	headlightsOff = false;
	headlightsLow = true;
	headlightsHigh = false;
	signalLeft = true;
	signalRight = false;
	hazard = true;
	interior = true;
	pushToTalk = true;
	horn = true;
	aux = true;
	songPrev = true;
	songNext = false;
	volumeUp = true;
	volumeDown = false;
	brakes = true;
	forward = true;
	reverse = false;
	reset = true;

	acceleration = 50;
	regenBraking = 35;

	lightsHeadlightsLow = true;

  constructor() { }

  ngOnInit() {
  }

}
