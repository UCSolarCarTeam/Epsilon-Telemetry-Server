import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Controls } from '../../_objects/controls';
import { ControlsService } from '../../_services/controls.service';
import { Lights } from '../../_objects/lights';
import { LightsService } from '../../_services/lights.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  controls: Controls;
    lights: Lights;

  acceleration = 50;
  regenBraking = 35;

  lightsHeadlightsLow = true;

  constructor(private controlsService: ControlsService,
              private lightsService: LightsService) { }

  ngOnInit() {
    this.controls = this.controlsService.getData();
    this.lights = this.lightsService.getData();

    this.controlsService.controls$.subscribe(
      (data: Controls) => {
        this.controls = data;
      }
    );

    this.lightsService.lights$.subscribe(
      (data: Lights) => {
        this.lights = data;
      }
    );
  }

}
