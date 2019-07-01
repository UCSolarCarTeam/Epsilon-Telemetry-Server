import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from './data-table/data-table.component';
import { LapData } from '../../_objects/lapData';
import { LapService } from '../../_services/lap.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  private lapDataArray: LapData[];
  private batteryTimeRemainingString: string;
  private estimatedLapsRemaining: string;

  private FSGP_TRACK_DISTANCE = 5.513;

  constructor(private lapService: LapService) {
    this.batteryTimeRemainingString = 'Forever';
    this.estimatedLapsRemaining = 'Unknown'
  }

  ngOnInit() {
    this.lapDataArray = this.lapService.getData();
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapDataArray = data;
        this.batteryTimeRemainingString = this.getTimeString(this.lapDataArray[0].batterySecondsRemaining);
        this.estimatedLapsRemaining = this.getEstimatedLapsRemaining(this.lapDataArray[0]);
      }
    );
  }

  getTimeString(secondsdifference): string {
    const hours = Math.floor(secondsdifference / 3600);
    const minutes = Math.floor((secondsdifference - (hours * 3600)) / 60);
    const seconds = secondsdifference - (hours * 3600) - (minutes * 60);

    const timestring = hours + ' hours, '
                   + minutes + ' minutes'
    return timestring;
  }

  getEstimatedLapsRemaining(lapData): string {
    const averageDrivingSpeed = lapData.averageSpeed;
    const batteryHoursRemaining = lapData.batterySecondsRemaining / 3600;

    const estimatedLapsRemainingNumber = Math.floor(averageDrivingSpeed
                                     * batteryHoursRemaining
                                     / this.FSGP_TRACK_DISTANCE);
    return estimatedLapsRemainingNumber + ' more laps at this rate';
  }

}
