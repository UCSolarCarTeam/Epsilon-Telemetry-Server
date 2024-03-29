import { Injectable, EventEmitter } from '@angular/core';
import { ILapDataInterface } from '../_objects/interfaces/lap-data.interface';
import { LapData } from '../_objects/lapData';
import { WebSocketService } from '../websocket.service';
import { RoundingService } from './rounding.service';

import { DataTableComponent } from './../tabs/race/data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class LapService {

  lapData$: EventEmitter<LapData[]>;

  private lapDataArray: LapData[];

  constructor(private wsService: WebSocketService,
              private rdService: RoundingService) {
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
    newData.timestamp = data.timestamp;
    newData.totalPowerIn = this.rdService.getRoundedValue(data.totalpowerin, 2);
    newData.totalPowerOut = this.rdService.getRoundedValue(data.totalpowerout, 2);
    newData.netPowerOut = this.rdService.getRoundedValue(data.netpowerout, 2);
    newData.distance = this.rdService.getRoundedValue(data.distance, 2);
    newData.amphours = this.rdService.getRoundedValue(data.amphours, 2);
    newData.averagePackCurrent = this.rdService.getRoundedValue(data.averagepackCurrent, 2);
    newData.batterySecondsRemaining = data.batterysecondsremaining;
    newData.averageSpeed = this.rdService.getRoundedValue(data.averagespeed, 2);

    this.lapDataArray.unshift(newData)
    this.lapDataArray.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
  }

  getTimeString(secondsdifference): string {

    // Display seconds difference as "HH:MM:SS"
    const date = new Date(null);
    date.setMilliseconds(secondsdifference);
    return date.toISOString().substr(11, 8);
  }
}
