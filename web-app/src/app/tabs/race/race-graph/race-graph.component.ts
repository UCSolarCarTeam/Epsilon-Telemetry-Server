import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

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

    for (const dataPoint of this.lapData) {
      this.lapTimeArray.unshift({x: lapDataIdx, y: this.convertToMinutes(dataPoint.lapTime)});
      this.totalPowerInArray.unshift({x: lapDataIdx, y: dataPoint.totalPowerIn});
      this.totalPowerOutArray.unshift({x: lapDataIdx, y: dataPoint.totalPowerOut});
      this.netPowerOutArray.unshift({x: lapDataIdx, y: dataPoint.netPowerOut});
      this.distanceArray.unshift({x: lapDataIdx, y: dataPoint.distance});
      this.amphoursArray.unshift({x: lapDataIdx, y: dataPoint.amphours});
      this.averagePackCurrentArray.unshift({x: lapDataIdx, y: dataPoint.averagePackCurrent});
      this.batterySecondsRemainingArray.unshift({x: lapDataIdx, y: dataPoint.batterySecondsRemaining});
      lapDataIdx--
    }
  }

  addLapData(dataPoint: LapData) {
      this.currLap++;
      this.lapTimeArray.push({x: this.currLap, y: this.convertToMinutes(dataPoint.lapTime)});
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

  convertToMinutes(timeString: string) {
    const splitTime = timeString.split(':', 3)
    return Number(splitTime[0]) * 60 + Number(splitTime[1]) + Number(splitTime[2]) / 60
  }

  updateChart() {
    let graphHeader: String;
    let yLabel: String;
    const graphInput: GraphInputData[] = [];

    // Update graph inputs
    if (this.selectedGraph === 'Time') {
      graphHeader = 'Lap Time';
      yLabel = 'Time (minutes)';
      graphInput.push({type: 'line', dataPoints: this.lapTimeArray, showInLegend: false, legendText: ''})
    } else if (this.selectedGraph === 'Power') {
      graphHeader = 'Total Power';
      yLabel = 'Power (W)';
      graphInput.push({type: 'line', dataPoints: this.totalPowerInArray, showInLegend: true, legendText: 'Total Power In'})
      graphInput.push({type: 'line', dataPoints: this.totalPowerOutArray, showInLegend: true, legendText: 'Total Power Out'})
      graphInput.push({type: 'line', dataPoints: this.netPowerOutArray, showInLegend: true, legendText: 'Net Power Out'})
    } else if (this.selectedGraph === 'Distance') {
      graphHeader = 'Distance Remaining';
      yLabel = 'Distance (km)';
      graphInput.push({type: 'line', dataPoints: this.distanceArray, showInLegend: false, legendText: ''})
    } else if (this.selectedGraph === 'Amp Hours') {
      graphHeader = 'Amp Hours';
      yLabel = 'Amp Hours (Ah)';
      graphInput.push({type: 'line', dataPoints: this.amphoursArray, showInLegend: false, legendText: ''})
    } else if (this.selectedGraph === 'Current') {
      graphHeader = 'Average Pack Current';
      yLabel = 'Current (A)';
      graphInput.push({type: 'line', dataPoints: this.averagePackCurrentArray, showInLegend: false, legendText: ''})
    } else if (this.selectedGraph === 'Battery') {
      graphHeader = 'Battery Seconds Remaining';
      yLabel = 'Time (seconds)'
      graphInput.push({type: 'line', dataPoints: this.batterySecondsRemainingArray, showInLegend: false, legendText: ''})
    }

    this.chart.options.axisX.maximum = this.currLap + 1
    this.chart.options.title.text = graphHeader;
    this.chart.options.axisY.title = yLabel;
    this.chart.options.data = graphInput;
    this.chart.render();
  }
}

interface GraphDataPoint {
  x: number,
  y: number
}

interface GraphInputData {
  // Note: More data customizations can be done here.
  // see https://canvasjs.com/docs/charts/chart-options/data/ for customizable options

  type: string,
  dataPoints: GraphDataPoint[],
  showInLegend: boolean,
  legendText: string
}
