import { EventEmitter, Injectable } from '@angular/core';
import { WebSocketService } from 'app/websocket.service';
import { INewTelemetryData } from 'app/_objects/interfaces/new-telemetry-data.interface';
import { Packet } from 'app/_objects/packet';

@Injectable({
  providedIn: 'root'
})
export class TesttingService {

  testPacket$: EventEmitter<object>;

  private testPacket: object;

  constructor(private wsService: WebSocketService) {
    this.testPacket$ = new EventEmitter<object>();
    this.testPacket = new Object;

    this.wsService.packetMultiplex$.subscribe(
      (data) => {
        this.updateData(data);
        this.testPacket$.emit(this.getData());
      }
    );
  }

  getData() {
    return this.testPacket;
  }

  private updateData(data): void {
    this.testPacket = data;
  }
}


