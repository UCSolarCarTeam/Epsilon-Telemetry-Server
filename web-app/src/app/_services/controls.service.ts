import { Injectable, EventEmitter } from '@angular/core';

import { Controls } from '../_objects/controls';
import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
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

    this.wsService.socket$.subscribe(
      (data: ITelemetryData) => {
        this.updateControls(data);
        this.controls$.emit(this.getData());
      }
    );
  }

  getData(): Controls {
    return this.controls;
  }

  private updateControls(data: ITelemetryData): void {
    this.controls.acceleration = data.acceleration;
    this.controls.alive = data.drivercontrolsalive;
    this.controls.aux = data.aux;
    this.controls.brakes = data.brakes;
    this.controls.forward = data.controlsforward;
    this.controls.hazard = data.hazard;
    this.controls.headlightsHigh = data.headlightshigh;
    this.controls.headlightsLow = data.headlightslow;
    this.controls.headlightsOff = data.headlightsoff;
    this.controls.horn = data.horn;
    this.controls.interior = data.interior;
    this.controls.nextSong = data.nextsong;
    this.controls.prevSong = data.prevsong;
    this.controls.pushToTalk = data.pushtotalk;
    this.controls.regenBraking = data.regenbraking;
    this.controls.reset = data.controlsmotorreset;
    this.controls.reverse = data.controlsreverse;
    this.controls.signalLeft = data.signalleft;
    this.controls.signalRight = data.signalright;
    this.controls.volumeDown = data.volumedown;
    this.controls.volumeUp = data.volumeup;
    this.controls.lap = data.lap;
  }
}
