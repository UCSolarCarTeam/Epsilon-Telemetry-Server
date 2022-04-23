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
    this.lights.alive = data.Lights.Alive;
    this.lights.bmsStrobeLight = data.Lights.BMSStrobeLight;
    this.lights.brakes = data.Lights.Brakes;
    this.lights.highBeams = data.Lights.HighBeams;
    this.lights.leftSignal = data.Lights.LeftSignal;
    this.lights.lowBeams = data.Lights.LowBeams;
    this.lights.rightSignal = data.Lights.RightSignal;
  }
}
