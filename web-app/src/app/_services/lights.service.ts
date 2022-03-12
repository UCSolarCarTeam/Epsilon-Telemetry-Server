import { Injectable, EventEmitter } from '@angular/core';

import { INewTelemetryData } from '../_objects/interfaces/new-telemetry-data.interface';
import { Lights } from '../_objects/lights';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LightsService {

  lights$: EventEmitter<Lights>;

  private lights: Lights;

  constructor(private wsService: WebSocketService) {
    this.lights$ = new EventEmitter<Lights>();
    this.lights = new Lights;

    this.wsService.packetMultiplex$.subscribe(
      (data: INewTelemetryData) => {
        this.updateLights(data);
        this.lights$.emit(this.getData());
      }
    );
  }

  getData(): Lights {
    return this.lights;
  }

  private updateLights(data: INewTelemetryData): void {
    this.lights.alive = data.lights.lightAlive;
    this.lights.bmsStrobeLight = data.lights.BMSStrobeLight;
    this.lights.brakes = data.lights.brakes;
    this.lights.highBeams = data.lights.highBeams;
    this.lights.leftSignal = data.lights.leftSignal;
    this.lights.lowBeams = data.lights.lowBeams;
    this.lights.rightSignal = data.lights.rightSignal;
  }
}
