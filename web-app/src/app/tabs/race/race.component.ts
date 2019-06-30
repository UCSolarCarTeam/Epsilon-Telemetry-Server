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
    this.batteryTimeRemainingString = 'Forever'
  }

  ngOnInit() {
    this.lapDataArray = this.lapService.getData();
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapDataArray = data;
        console.log(this.lapDataArray[0].batterySecondsRemaining)
        this.batteryTimeRemainingString = this.getTimeString(this.lapDataArray[0].batterySecondsRemaining);
        this.estimatedLapsRemaining = this.getEstimatedLapsRemaining(this.lapDataArray[0]);
      }
    );
  }

  getTimeString(secondsdifference): string {
    let hours = Math.floor(secondsdifference / 3600);
    let minutes = Math.floor((secondsdifference - (hours * 3600)) / 60);
    let seconds = secondsdifference - (hours * 3600) - (minutes * 60);

    console.log(hours);
    console.log(minutes)
    console.log(seconds)

    let timestring = hours + ' hours, '
                   + minutes + ' minutes'
    return timestring;
  }

  getEstimatedLapsRemaining(lapData): string {
    let averageDrivingSpeed = 60;
    let batteryHoursRemaining = lapData.batterySecondsRemaining / 3600;

    let estimatedLapsRemainingNumber = Math.floor(averageDrivingSpeed
                                     * batteryHoursRemaining
                                     / this.FSGP_TRACK_DISTANCE);
    return estimatedLapsRemainingNumber + ' more laps at this rate';
  }

}
