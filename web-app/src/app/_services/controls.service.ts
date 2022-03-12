import { Injectable, EventEmitter } from '@angular/core';

import { Controls } from '../_objects/controls';
import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  controls$: EventEmitter<Controls>;

  private controls: Controls;

  constructor(private wsService: WebSocketService) {
    this.controls$ = new EventEmitter<Controls>();
    this.controls = new Controls;

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateControls(data);
        this.controls$.emit(this.getData());
      }
    );
  }

  getData(): Controls {
    return this.controls;
  }

  private updateControls(data: INewTelemetryData): void {
    this.controls.acceleration = data.driverControls.acceleration;
    this.controls.alive = data.driverControls.alive;
    this.controls.aux = data.driverControls.aux;
    this.controls.brakes = data.driverControls.brakes;
    this.controls.forward = data.driverControls.forward;
    this.controls.hazard = data.driverControls.hazard;
    this.controls.headlightsHigh = data.driverControls.headlightsHigh;
    this.controls.headlightsLow = data.driverControls.headlightsLow;
    this.controls.headlightsOff = data.driverControls.headlightsOff;
    this.controls.horn = data.driverControls.horn;
    this.controls.interior = data.driverControls.interior;
    this.controls.nextSong = data.driverControls.nextSong;
    this.controls.prevSong = data.driverControls.prevSong;
    this.controls.pushToTalk = data.driverControls.pushToTalk;
    this.controls.regenBraking = data.driverControls.regenBraking;
    this.controls.reset = data.driverControls.reset;
    this.controls.reverse = data.driverControls.reverse;
    this.controls.signalLeft = data.driverControls.signalLeft;
    this.controls.signalRight = data.driverControls.signalRight;
    this.controls.volumeDown = data.driverControls.volumeDown;
    this.controls.volumeUp = data.driverControls.volumeUp;
    this.controls.lap = false; // TODO: update this value
  }
}
