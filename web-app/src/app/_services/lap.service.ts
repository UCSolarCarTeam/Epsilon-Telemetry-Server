import { Injectable, EventEmitter } from '@angular/core';
import { ILapDataInterface } from '../_objects/interfaces/lap-data.interface';
import { LapData } from '../_objects/lapData';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LapService {

  lapData$: EventEmitter<LapData[]>;

  private lapDataArray: LapData[];

  constructor(private wsService: WebSocketService) {
    this.lapDataArray = []
    this.lapData$ = new EventEmitter<LapData[]>();
    this.wsService.lapMultiplex$.subscribe(
      (data: ILapDataInterface) => {
          this.updateLapData(data);
          this.lapData$.emit(this.getData());
      }
    );
  }

  getData() {
      return this.lapDataArray;
  }
  updateLapData(data: ILapDataInterface): void {
    const newData = new LapData();
    newData.lapNumber = data.lapnumber;
    newData.lapTime = data.timestamp;
    newData.totalPowerIn = data.totalpowerin;
    newData.totalPowerOut = data.totalpowerout;
    newData.netPowerOut = data.netpowerout;
    newData.distance = data.distance;

    this.lapDataArray.push(newData)
  }
}
