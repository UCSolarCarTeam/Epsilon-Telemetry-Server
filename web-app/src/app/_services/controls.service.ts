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
    this.controls.acceleration = data.DriverControls.Acceleration;
    this.controls.alive = data.DriverControls.Alive;
    this.controls.aux = data.DriverControls.Aux;
    this.controls.brakes = data.DriverControls.Brakes;
    this.controls.forward = data.DriverControls.Forward;
    this.controls.hazard = data.DriverControls.Hazard;
    this.controls.headlightsHigh = data.DriverControls.HeadlightsHigh;
    this.controls.headlightsLow = data.DriverControls.HeadlightsLow;
    this.controls.headlightsOff = data.DriverControls.HeadlightsOff;
    this.controls.horn = data.DriverControls.Horn;
    this.controls.interior = data.DriverControls.Interior;
    this.controls.nextSong = data.DriverControls.NextSong;
    this.controls.prevSong = data.DriverControls.PrevSong;
    this.controls.pushToTalk = data.DriverControls.PushToTalk;
    this.controls.regenBraking = data.DriverControls.RegenBraking;
    this.controls.reset = data.DriverControls.Reset;
    this.controls.reverse = data.DriverControls.Reverse;
    this.controls.signalLeft = data.DriverControls.SignalLeft;
    this.controls.signalRight = data.DriverControls.SignalRight;
    this.controls.volumeDown = data.DriverControls.VolumeDown;
    this.controls.volumeUp = data.DriverControls.VolumeUp;
    this.controls.lap = data.DriverControls.Lap;
  }
}
