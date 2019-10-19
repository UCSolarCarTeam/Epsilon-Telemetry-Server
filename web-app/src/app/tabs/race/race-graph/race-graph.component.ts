import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { LapService } from '../../../_services/lap.service';
import { LapData } from '../../../_objects/lapData';

import * as CanvasJS from '../../../../assets/thirdParty/canvasjs.min';

@Component({
  selector: 'app-race-graph',
  templateUrl: './race-graph.component.html',
  styleUrls: ['./race-graph.component.css']
})
export class RaceGraphComponent implements OnInit {
  lapTimeArray:graphDataPoint[];
  totalPowerInArray:graphDataPoint[];
  totalPowerOutArray:graphDataPoint[] ;
  netPowerOutArray:graphDataPoint[];
  distanceArray:graphDataPoint[];
  amphoursArray:graphDataPoint[];
  averagePackCurrentArray:graphDataPoint[];
  batterySecondsRemainingArray:graphDataPoint[];
  lapData:LapData[];

  graphOptions:string[] = ['Time', 'Power', 'Distance', 'Amp Hours', 'Current', 'Battery' ];
  currLap:number;
  graphHeader:string;
  selectedGraph:string;
  chart: CanvasJS.Chart;

  constructor(private lapService: LapService) { }

  ngOnInit() {
    this.currLap = 0;
    this.lapData = this.lapService.getData();
    this.initializeDataArrays();

    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.addLapData(data[0]) //most recent data point is at array beginning
        this.updateChart();
      });

    this.chart = new CanvasJS.Chart("raceGraph",{
      exportEnabled: true,
      theme: "dark1",
      backgroundColor: 'transparent',
    
      title:{
        text: "Distance Remaining",
        fontSize: 20
      },
      data: [{
        type: "spline",
        dataPoints : this.distanceArray, // Start off by displaying lap distance graph
      },
      { 
        type: "spline",
        dataPoints: [],
      },
      {
        type: "spline",
        dataPoints: [],
      }],

      axisX:{
        title: "Lap Number",
        fontSize: 15,
      },

      axisY:{
        title: "Distance (m)",
        fontSize: 15,
      }
    });

  this.chart.render();
  }

  initializeDataArrays(){
    for (let dataPoint of this.lapData)
    {
      this.currLap++;
      this.lapTimeArray.unshift({x: this.currLap, y: +dataPoint.lapTime});
      this.totalPowerInArray.unshift({x: this.currLap, y: dataPoint.totalPowerIn});
      this.totalPowerInArray.unshift({x: this.currLap, y: dataPoint.totalPowerOut});
      this.netPowerOutArray.unshift({x: this.currLap, y: dataPoint.netPowerOut});
      this.distanceArray.unshift({x: this.currLap, y: dataPoint.distance});
      this.amphoursArray.unshift({x: this.currLap,y: dataPoint.amphours});
      this.averagePackCurrentArray.unshift({x: this.currLap, y: dataPoint.averagePackCurrent});
      this.batterySecondsRemainingArray.unshift({x: this.currLap, y: dataPoint.batterySecondsRemaining});
    }
  }

  addLapData(dataPoint:LapData)
  {
    this.currLap++;
      this.lapTimeArray.push({x: this.currLap, y: +dataPoint.lapTime});
      this.totalPowerInArray.push({x: this.currLap, y: dataPoint.totalPowerIn});
      this.totalPowerInArray.push({x: this.currLap, y: dataPoint.totalPowerOut});
      this.netPowerOutArray.push({x: this.currLap, y: dataPoint.netPowerOut});
      this.distanceArray.push({x: this.currLap, y: dataPoint.distance});
      this.amphoursArray.push({x: this.currLap,y: dataPoint.amphours});
      this.averagePackCurrentArray.push({x: this.currLap, y: dataPoint.averagePackCurrent});
      this.batterySecondsRemainingArray.push({x: this.currLap, y: dataPoint.batterySecondsRemaining});
  }

  //event Handler for radio button selection change
  radioChangeHandler (event: any){
    this.selectedGraph = event.value;
    console.log("Graph selection changed to " + event.value);
    this.updateChart();
  }

  updateChart(){
    var arrayToDisplay: graphDataPoint[];
    var arrayToDisplayTwo: graphDataPoint[];
    var arrayToDisplayThree: graphDataPoint[];
    var graphHeader: String;
    var yLabel: String;

    //Update graph inputs
    if (this.selectedGraph == 'Time'){
      graphHeader = 'Lap Time';
      yLabel = 'Time';
      arrayToDisplay = this.distanceArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
    }
    else if (this.selectedGraph == 'Power'){
      graphHeader = 'Total Power';
      yLabel = 'Power';
      arrayToDisplay = this.totalPowerInArray;
      arrayToDisplayTwo = this.totalPowerOutArray;
      arrayToDisplayThree = this.netPowerOutArray;
    }
    else if (this.selectedGraph == 'Distance'){
      graphHeader = 'Distance  Remaining';
      yLabel = 'Distance (m)';
      arrayToDisplay = this.distanceArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
    }
    else if (this.selectedGraph == 'Amp Hours'){
      graphHeader = 'Amp Hours';
      yLabel = 'Amp Hours'
      arrayToDisplay = this.amphoursArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
    }
    else if (this.selectedGraph == 'Current'){
      graphHeader = 'Average Pack Current';
      yLabel = 'Current (Amp)';
      arrayToDisplay = this.averagePackCurrentArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
    }
    else if (this.selectedGraph == 'Battery'){
      graphHeader = 'Battery Secs Remaining';
      yLabel = 'Time (seconds)'
      arrayToDisplay = this.batterySecondsRemainingArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
    }

    
    this.chart.options.title.text = graphHeader;
    this.chart.options.axisY.title = yLabel;
    this.chart.options.data.dataPoints[0] = arrayToDisplay;
    this.chart.options.data.dataPoints[1] = arrayToDisplayTwo;
    this.chart.options.data.dataPoints[2] = arrayToDisplayThree;

    console.log(this.chart);
    this.chart.render();
  }
}

interface graphDataPoint{
  x:number,
  y:number
}
