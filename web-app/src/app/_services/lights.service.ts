import { Injectable, EventEmitter } from '@angular/core';

import { ITelemetryData } from '../_objects/interfaces/telemetry-data.interface';
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
      (data: ITelemetryData) => {
        this.updateLights(data);
        this.lights$.emit(this.getData());
      }
    );
  }

  getData(): Lights {
    return this.lights;
  }

  private updateLights(data: ITelemetryData): void {
    this.lights.alive = data.lightsalive;
    this.lights.bmsStrobeLight = data.bmsstrobelight;
    this.lights.brakes = data.brakelights;
    this.lights.highBeams = data.highbeams;
    this.lights.leftSignal = data.leftsignal;
    this.lights.lowBeams = data.lowbeams;
    this.lights.rightSignal = data.rightsignal;
  }
}
