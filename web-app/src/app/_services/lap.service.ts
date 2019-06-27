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

    newData.lapTime = this.getTimeString(data.secondsdifference);

    newData.totalPowerIn = data.totalpowerin;
    newData.totalPowerOut = data.totalpowerout;
    newData.netPowerOut = data.netpowerout;
    newData.distance = data.distance;
    newData.amphours = data.amphours;
    newData.averagePackCurrent = data.averagepackcurrent;
    newData.batterySecondsRemaining = data.batterysecondsremaining;
    newData.averageTime = (data.secondsdifference + data.averagetime) / 2;
    newData.lapsRemaining = data.batterysecondsremaining / data.averagetime;

    this.lapDataArray.unshift(newData)
  }

  getTimeString(secondsdifference): string {

    // Display seconds difference as "HH:MM:SS"
    const date = new Date(null);
    date.setMilliseconds(secondsdifference);
    return date.toISOString().substr(11, 8);
  }
}
