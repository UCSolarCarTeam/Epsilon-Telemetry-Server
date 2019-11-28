import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { LapService } from '../../../_services/lap.service';
import { LapData } from '../../../_objects/lapData';

import * as CanvasJS from '../../../../assets/thirdParty/canvasjs.min.js';

@Component({
  selector: 'app-race-graph',
  templateUrl: './race-graph.component.html',
  styleUrls: ['./race-graph.component.css']
})
export class RaceGraphComponent implements OnInit {
  lapTimeArray: GraphDataPoint[] = [];
  totalPowerInArray: GraphDataPoint[] = [];
  totalPowerOutArray: GraphDataPoint[] = [];
  netPowerOutArray: GraphDataPoint[] = [];
  distanceArray: GraphDataPoint[] = [];
  amphoursArray: GraphDataPoint[] = [];
  averagePackCurrentArray: GraphDataPoint[] = [];
  batterySecondsRemainingArray: GraphDataPoint[] = [];
  lapData: LapData[] = [];

  graphOptions: string[] = ['Time', 'Power', 'Distance', 'Amp Hours', 'Current', 'Battery' ];
  currLap: number;
  graphHeader: string;
  selectedGraph: string;
  chart: CanvasJS.Chart;

  constructor(private lapService: LapService) {
    this.lapData = this.lapService.getData();
  }

   ngOnInit() {
    this.currLap = 0;
    this.initializeDataArrays();
    console.log(this.lapData);

    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.addLapData(data[0]) // most recent data point is at array beginning
        this.updateChart();
      });

    this.chart = new CanvasJS.Chart('raceGraph', {
      exportEnabled: true,
      theme: 'dark1',
      backgroundColor: 'transparent',
      title: {
        text : 'Distance Remaining',
        fontSize: 20
      },
      data: [{
        type: 'line',
        dataPoints : this.distanceArray, // Start off by displaying lap distance graph
      },
      {
        type: 'line',
        dataPoints: [],
      },
      {
        type: 'line',
        dataPoints: [],
      }],

      axisX: {
        title: 'Lap Number',
        fontSize: 15,
      },

      axisY: {
        title: 'Distance (m)',
        fontSize: 15,
      }
    });

  this.chart.render();
  }

  async initializeDataArrays() {
    this.lapData = this.lapService.getData()
    this.currLap = this.lapData.length;
    let lapDataIdx =  this.lapData.length;

    // waitsFor(function(){
    //   this.lapData = this.lapService.getData()
    //   return true
    // }, 'Lap Data fetch taking too long', 1000)
    console.log(this)

    for (const dataPoint of this.lapData) {
      this.lapTimeArray.unshift({x: lapDataIdx, y: +dataPoint.lapTime});
      this.totalPowerInArray.unshift({x: lapDataIdx, y: dataPoint.totalPowerIn});
      this.totalPowerOutArray.unshift({x: lapDataIdx, y: dataPoint.totalPowerOut});
      this.netPowerOutArray.unshift({x: lapDataIdx, y: dataPoint.netPowerOut});
      this.distanceArray.unshift({x: lapDataIdx, y: dataPoint.distance});
      this.amphoursArray.push({x: lapDataIdx, y: dataPoint.amphours});
      this.averagePackCurrentArray.unshift({x: lapDataIdx, y: dataPoint.averagePackCurrent});
      this.batterySecondsRemainingArray.unshift({x: lapDataIdx, y: dataPoint.batterySecondsRemaining});
      lapDataIdx--
    }
    console.log('Done initializing data arrays. CurrIdx = ' + lapDataIdx)
    // console.log(this.lapTimeArray);
  }

  addLapData(dataPoint: LapData) {
      this.currLap++;
      this.lapTimeArray.push({x: this.currLap, y: +dataPoint.lapTime});
      this.totalPowerInArray.push({x: this.currLap, y: dataPoint.totalPowerIn});
      this.totalPowerOutArray.push({x: this.currLap, y: dataPoint.totalPowerOut});
      this.netPowerOutArray.push({x: this.currLap, y: dataPoint.netPowerOut});
      this.distanceArray.push({x: this.currLap, y: dataPoint.distance});
      this.amphoursArray.push({x: this.currLap, y: dataPoint.amphours});
      this.averagePackCurrentArray.push({x: this.currLap, y: dataPoint.averagePackCurrent});
      this.batterySecondsRemainingArray.push({x: this.currLap, y: dataPoint.batterySecondsRemaining});
  }

  // event Handler for radio button selection change
  radioChangeHandler (event: any) {
    this.selectedGraph = event.value;
    console.log('Graph selection changed to ' + event.value);
    this.updateChart();
  }

  updateChart() {
    let arrayToDisplay: GraphDataPoint[];
    let arrayToDisplayTwo: GraphDataPoint[];
    let arrayToDisplayThree: GraphDataPoint[];
    const legend: string[] =  ['Total Power In', 'Total Power Out', 'Net Power Out'];
    let showLegend: boolean[] = [false, false, false]
    let graphHeader: String;
    let yLabel: String;

    // Update graph inputs
    if (this.selectedGraph === 'Time') {
      graphHeader = 'Lap Time';
      yLabel = 'Time';
      arrayToDisplay = this.distanceArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
      showLegend = [false, false, false]
    } else if (this.selectedGraph === 'Power') {
      graphHeader = 'Total Power';
      yLabel = 'Power (W)';
      arrayToDisplay = this.totalPowerInArray;
      arrayToDisplayTwo = this.totalPowerOutArray;
      arrayToDisplayThree = this.netPowerOutArray;
      showLegend = [true, true, true]
    } else if (this.selectedGraph === 'Distance') {
      graphHeader = 'Distance  Remaining';
      yLabel = 'Distance (km)';
      arrayToDisplay = this.distanceArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
      showLegend = [false, false, false]
    } else if (this.selectedGraph === 'Amp Hours') {
      graphHeader = 'Amp Hours';
      yLabel = 'Amp Hours (Ah)'
      arrayToDisplay = this.amphoursArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
      showLegend = [false, false, false]
    } else if (this.selectedGraph === 'Current') {
      graphHeader = 'Average Pack Current';
      yLabel = 'Current (A)';
      arrayToDisplay = this.averagePackCurrentArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
      showLegend = [false, false, false]
    } else if (this.selectedGraph === 'Battery') {
      graphHeader = 'Battery Secs Remaining';
      yLabel = 'Time'
      arrayToDisplay = this.batterySecondsRemainingArray;
      arrayToDisplayTwo = [];
      arrayToDisplayThree = [];
      showLegend = [false, false, false]
    }

    this.chart.options.axisX.maximum = this.currLap + 1
    this.chart.options.title.text = graphHeader;
    this.chart.options.axisY.title = yLabel;

    this.chart.options.data[0].dataPoints = arrayToDisplay;
    this.chart.options.data[1].dataPoints = arrayToDisplayTwo;
    this.chart.options.data[2].dataPoints = arrayToDisplayThree;

    this.chart.options.data[0].showInLegend = showLegend[0];
    this.chart.options.data[1].showInLegend = showLegend[1];
    this.chart.options.data[2].showInLegend = showLegend[2];

    this.chart.options.data[0].legendText = legend[0];
    this.chart.options.data[1].legendText = legend[1];
    this.chart.options.data[2].legendText = legend[2];

    console.log(this.chart);
    console.log(arrayToDisplay);
    this.chart.render();
  }
}

interface GraphDataPoint {
  x: number,
  y: number
}
