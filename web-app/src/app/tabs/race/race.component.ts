import { Component, OnInit } from '@angular/core';
import { LapData } from '../../_objects/lapData';
import { LapService } from '../../_services/lap.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  private lapDataArray: LapData[];

  constructor(private lapService: LapService) { }

  ngOnInit() {
    this.lapDataArray = this.lapService.getData();
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapDataArray = data;
        console.log(this.lapDataArray)
      }
    );
  }

}
