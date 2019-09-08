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
  batteryTimeRemainingString: string;
  estimatedLapsRemaining: string;

  private FSGP_TRACK_DISTANCE = 5.513;

  constructor(private lapService: LapService) {
  }

  ngOnInit() {
    this.lapDataArray = this.lapService.getData();
    this.updatePredictors();

    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapDataArray = data;
        this.updatePredictors();
      }
    );
  }

  getTimeString(secondsdifference, isCharging): string {
    if (secondsdifference < 0) {
      return 'Unknown (No Pack Current)'
    }
    const hours = Math.floor(secondsdifference / 3600);
    const minutes = Math.floor((secondsdifference - (hours * 3600)) / 60);
    const seconds = secondsdifference - (hours * 3600) - (minutes * 60);

    let timestring = hours + ' hours, '
                   + minutes + ' minutes'

    if (!isCharging) {
      timestring += ' until depletion'
    } else {
      timestring += ' until charged'
    }
    return timestring;
  }

  getEstimatedLapsRemaining(lapData): string {
    const averageDrivingSpeed = lapData.averageSpeed;
    const batteryHoursRemaining = lapData.batterySecondsRemaining / 3600;

    const estimatedLapsRemainingNumber = Math.floor(averageDrivingSpeed
                                     * batteryHoursRemaining
                                     / this.FSGP_TRACK_DISTANCE);
    let numberLapsString = 'Unknown (No Pack Current)';
    if (estimatedLapsRemainingNumber >= 0) {
      numberLapsString = estimatedLapsRemainingNumber + ' more laps at this rate';
    }
    return numberLapsString;
  }

  updatePredictors() {
    if (this.lapDataArray.length > 0) {
      this.estimatedLapsRemaining = this.getEstimatedLapsRemaining(this.lapDataArray[0]);
      this.batteryTimeRemainingString = this.getTimeString(
        this.lapDataArray[0].batterySecondsRemaining,
        (this.lapDataArray[0].averagePackCurrent < 0));
    } else {
      this.batteryTimeRemainingString = 'Unknown';
      this.estimatedLapsRemaining = 'Unknown'
    }
  }
}
