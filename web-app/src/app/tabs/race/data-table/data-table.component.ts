import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LapData } from '../../../_objects/lapData';
import { LapService } from '../../../_services/lap.service';
import { ExportService } from '../../../_services/export.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild('table') table: MatTable<LapData>;
  //@Input() label: string;
  //@Input driver: string;

  displayedColumns =
  ['lapNumber',
  'lapTime',
  'totalPowerIn',
  'totalPowerOut',
  'netPowerOut',
  'averageSpeed',
  'distance',
  'amphours',
  'averagePackCurrent',
  'dataLabel',
  'driverLabel', ];

  picklist: string[] = 
  ['Quarter 1', 
  'Quarter 2', 
  'Quarter 3', 
  'Full lap', 
  'Charging', 
  'Stationary', 
  'Testing',
  'Pit Stop'];

  driverlist: string[] =
  ['Colton', 
  'Kayla', 
  'Liam', 
  'Raheel'];

  lapData: LapData[];
  label: string;
  driver: string;

  constructor(private lapService: LapService, private exportService: ExportService) { 
  this.label = 'None';
  this.driver = 'None'
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit() {
    this.lapData = this.lapService.getData()
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapData = data;
        //console.log(this.lapData);
        //console.log('LABEL: ' + this.label);
        //console.log('DRIVER: ' + this.driver);
        this.table.renderRows();
      }
    );
  }

  export(): void {
    this.exportService.exportExcel(this.lapData, 'lapData');
  };

  saveLabel(event): void {
    console.log(event.value);
    this.label = event.value;
    console.log('Label assign works: ' + this.label);
    this.lapData[this.getLapNumber() - 1].label = this.label;
  };

  saveDriver(event): void {
    console.log(event.value);
    this.driver = event.value;
    console.log('Driver assign works: ' + this.driver);
    this.lapData[this.getLapNumber() - 1].driver = this.driver;
  };

  getLapNumber(): number {
    return parseInt(document.getElementById("lapnumber").innerHTML);
  }
}
